import { Component, ViewChild, ViewChildren, QueryList, HostListener, OnInit } from '@angular/core';
import { GetDataServiceService } from '../services/get-data-service.service'
import { MatTableDataSource } from '@angular/material';
import { Chart } from '../app.chart';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as Highcharts from 'highcharts';
import * as HighchartsStock from "highcharts/highstock";
import { Data } from '../Model/Data';
import { QueryData } from '../Model/QueryData';
import { DplymntData } from '../Model/DplymntData';
import { BkupData } from '../Model/BkupData';
import { A0rgData } from '../Model/A0rgData';
import { MessageService } from '../services/message.service';

declare var require: any;
let Highcharts3D = require('highcharts/highcharts-3d');
// let HighchartsStock = require('highcharts/modules/stock.js');
Highcharts3D(Highcharts);
Highcharts3D(HighchartsStock);

// HighchartsStock(Highcharts)

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['select', 'ServerName', 'IP', 'Size'];
  displayedColumns1: string[] = ['Name', 'FilePath', 'SizeInBytes_A', 'SizeInBytes_B', 'ScanStamp_A', 'ScanStamp_B'];
  displayedDeplyColumns: string[] = ['Name', 'CreationTime', 'Mostrecentaccess', 'Mostrecentmodification', 'SizeInBytes', 'FilePath'];

  dataSrc: MatTableDataSource<Data>;
  queryDataSrc: MatTableDataSource<QueryData>[] = [];
  deplyDataSrc: MatTableDataSource<DplymntData>;
  selection = new SelectionModel<Data>(true, []);

  options: Data[];
  deply_options: DplymntData[];
  bkup_options: BkupData[];
  a0rgwc_options: A0rgData[];

  bkup_flag = false; deply_flag = false; a0rg_flag = false;

  selectedVal: '';
  arr1 = {};
  arr = [];
  grph_arr = []; grph_arr0 = []; grph_arr1 = [];
  bar_arr = []; bar_arr1 = []; bar_arr2 = [];
  line_arr = []; line_arr0 = [];
  reg_arr = []; reg_arr0 = [];
  drive_pie_arr = [];
  folder_pie_arr = [];

  serverControl = new FormControl('LT079861', [Validators.required]);
  datepicker = new FormControl(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), [Validators.required]);
  listarray: string[];
  val = false;
  worksheet = []; workbook = []; excelBuffer = [];
  server_max_size: any;
  value;
  minDate: Date; maxDate: Date;


  private paginator1: MatPaginator;
  @ViewChild('paginator1', { static: false }) set matPaginators(mp2: MatPaginator) {
    this.paginator1 = mp2;
    this.setDataSourceAttributes1();
  }

  setDataSourceAttributes1() {
    this.deplyDataSrc.paginator = this.paginator1;
  }

  private paginator: QueryList<MatPaginator>;
  @ViewChildren('paginator2') set matPaginator(mp: QueryList<MatPaginator>) {
    this.paginator = mp;
    this.setDataSourceAttribute2();
  }

  setDataSourceAttribute2() {
    if (this.listarray.length) {
      for (var i = 0; i < this.listarray.length; i++) {
        this.queryDataSrc[i].paginator = this.paginator.toArray()[i];
      }
    }
  }

  constructor(
    private _service: GetDataServiceService,
    private _MessageService: MessageService
  ) { }

  ngOnInit() {

    let selected_date = this.set_graph_parm();
    var d = new Date();
    d.setDate(d.getDate() - 1);
    let month = d.getMonth() + 1;
    let date = d.getDate();

    let mm = month.toString().length < 2 ? '0' + month.toString() : month.toString()
    let dd = date.toString().length < 2 ? '0' + date.toString() : date.toString()
    let prevdate = d.getFullYear() + '' + mm + '' + dd;

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, new Date().getMonth(), new Date().getDate() - 60);
    this.maxDate = new Date(currentYear, new Date().getMonth(), (new Date().getDate()))

    this._service.getdata(this.serverControl.value, prevdate, selected_date).subscribe(res => {
      this.chart_data(res, prevdate, selected_date);
    },
      err => {
        this._MessageService.openSnackBar({ message: 'Server error Occured', Action: 'Close', Class: "error" });
      });
    this.prediction_data();
  }

  chart_data(res, date: string, dte: string) {
    let c = new Chart();

    this.options = res[1];
    this.bkup_options = res[3];
    this.deply_options = res[4];
    this.a0rgwc_options = res[5];

    if (this.deply_options.length > 0) this.deply_flag = true

    for (var j in this.bkup_options) {
      this.bkup_flag = true
      this.deply_options.push(this.bkup_options[j]);
    }
    for (var j in this.a0rgwc_options) {
      this.a0rg_flag = true
      this.deply_options.push(this.a0rgwc_options[j]);
    }

    this.dataSrc = new MatTableDataSource(this.options);
    this.deplyDataSrc = new MatTableDataSource(this.deply_options);

    this.scatter_chart(c, res[0]);
    this.radial_chart(c, res[7]);
    this.line_chart(c, res[2]);
    this.drive_pie_chart(c, res[6]);
    this.folder_pie_chart(c, res[8]);

    Highcharts.chart('scatter_charts', c.scatter_options);
    HighchartsStock.chart('radial_bar', c.radial_options);
    Highcharts.chart('line_chart', c.line_options);
    Highcharts.chart('drive_pie', c.drive_pie_options);
    Highcharts.chart('folder_pie', c.folder_pie_options);

    this.grph_arr.splice(0, this.grph_arr.length);
    this.grph_arr0.splice(0, this.grph_arr0.length);
    this.grph_arr1.splice(0, this.grph_arr1.length);
    this.line_arr.splice(0, this.line_arr.length);
    this.line_arr0.splice(0, this.line_arr0.length);
    this.drive_pie_arr.splice(0, this.drive_pie_arr.length)
    this.folder_pie_arr.splice(0, this.folder_pie_arr.length)
  }

  prediction_data() {
    let c = new Chart();
    this._service.getPredictiondata(this.serverControl.value).subscribe(res => {
      if (res) {
        for (let i = 0; i < res.data.moving_avg.length; i++) {
          this.reg_arr.push(res.data.moving_avg[i][1]);
          this.reg_arr0.push([res.data.moving_avg[i][4], res.data.moving_avg[i][2]])
        }
        c.stock_chart_options.series[0].data = this.reg_arr0;
        c.stock_chart_options.xAxis.categories = this.reg_arr;
        HighchartsStock.stockChart('regression_plot', c.stock_chart_options);
      }
    },
      err => {
        this._MessageService.openSnackBar({ message: 'Prediction Data Not Found', Action: 'Close', Class: "error" });
      }
    );
  }

  scatter_chart(c: any, res: any) {
    for (let i = 0; i < res.length; i++) {
      this.grph_arr.push(parseInt(res[i].SizeInBytes_A) / 1048576);
      this.grph_arr0.push(parseInt(res[i].SizeInBytes_B) / 1048576);
      this.grph_arr1.push(res[i].FilePath);
    }
    c.scatter_options.series[0].data = this.grph_arr;
    c.scatter_options.series[1].data = this.grph_arr0;
    c.scatter_options.xAxis.categories = this.grph_arr1;
    c.scatter_options.title.text = 'File Changes In ' + this.serverControl.value + ' Server';
  }

  radial_chart(c: any, res: any) {
    for (let i = 0; i < res.length; i++) {
      this.bar_arr.push([res[i].ServerName]);
      this.bar_arr1.push(parseInt(res[i].Size) / 1048576);
      this.bar_arr2.push(parseInt(res[i].Space_Left) / 1048576);
    }
    c.radial_options.xAxis.categories = this.bar_arr;
    c.radial_options.series[1].data = this.bar_arr1;
    c.radial_options.series[0].data = this.bar_arr2;
  }

  line_chart(c: any, res: any) {
    for (let i = 0; i < res.length; i++) {
      this.line_arr.push([res[i].TimeStamp]);
      this.line_arr0.push(parseInt(res[i].SizeInBytes) / 1048576);
    }
    c.line_options.title.text = 'Server Size changes in ' + this.serverControl.value;
    c.line_options.series[0].data = this.line_arr0;
    c.line_options.xAxis.categories = this.line_arr;
  }

  drive_pie_chart(c: any, res: any) {
    for (let i = 0; i < res.length; i++) {
      this.drive_pie_arr.push([res[i].Name, res[i].SizeInBytes]);
    }
    c.drive_pie_options.series[0].data = this.drive_pie_arr;
  }

  folder_pie_chart(c: any, res: any) {
    for (let i = 0; i < res.length; i++) {
      this.folder_pie_arr.push([res[i].Name, res[i].Perc]);
    }
    c.folder_pie_options.series[0].data = this.folder_pie_arr;
  }

  ngAfterViewInit() {
    setTimeout(function () {
      document.getElementById("load").style.visibility = 'hidden';
    }, 300); //Sa

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSrc.data.length;
    if (this.serverControl.value)
      return numSelected === numRows - 1;
    else
      return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected())
      this.selection.clear();
    else
      this.dataSrc.data.forEach(row => { if (row.ServerName != this.serverControl.value) this.selection.select(row); });
  }

  clearscreen() {
    this.dataSrc.data.forEach(row => { this.selection.deselect(row); });
  }

  checkboxLabel(row?: Data, index?: number): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    else {
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index + 1}`;
    }
  }

  checkIfSelected(row?: Data) {
    if (row.ServerName === this.serverControl.value)
      return true;
  }

  listArray() {
    this.dataSrc.data.forEach(row => {
      !this.checkIfSelected(row) ? (this.selection.isSelected(row) ? this.arr1[row.ServerName] = row.ServerName : delete this.arr1[row.ServerName]) : delete this.arr1[row.ServerName];
    });
    this.listarray = Object.values(this.arr1);
  }

  onSubmit() {
    let prog_bar = document.getElementById("progress_bar");
    prog_bar.classList.toggle("hide");
    this.queryDataSrc = [];
    this.listArray();
    this._service.getTable(this.serverControl.value, this.listarray).subscribe(res => {
      if (res.length != 0) {
        console.log(res);
        prog_bar.classList.toggle("hide");
        if (this.listarray.length < 5) {
          for (let i = 0; i < this.listarray.length; i++) {
            this.value = 'ServerName ' + this.listarray[i];
            this.queryDataSrc[i] = new MatTableDataSource(res[i]);
            this.queryDataSrc[i].paginator = this.paginator.toArray()[i];
          }
        }
        else {
          prog_bar.classList.toggle("hide");
          this.exportTable();
        }
      }
      else {
        this._MessageService.openSnackBar({ message: 'Server Not Selected', Action: 'Close', Class: "error" });
        prog_bar.classList.toggle("hide");
      }
    },
      err => {
        this._MessageService.openSnackBar({ message: 'Server error Occured', Action: 'Close', Class: "error" });
      });
  }

  exportTable() {
    let sheet_dict = {};
    let sheetname = [];
    this.listArray();
    this._service.getTable(this.serverControl.value, this.listarray).subscribe(res => {
      if (res.length != 0) {
        for (let i = 0; i < this.listarray.length; i++) {
          this.worksheet[i] = XLSX.utils.json_to_sheet(res[i]);
          sheet_dict[this.listarray[i]] = this.worksheet[i];
          sheetname.push(this.listarray[i]);
        }
        const workbook: XLSX.WorkBook = { Sheets: sheet_dict, SheetNames: sheetname };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.serverControl.value);
      }
      else
        this._MessageService.openSnackBar({ message: 'Server Not Selected', Action: 'Close', Class: "error" });
      },
      err => {
        this._MessageService.openSnackBar({ message: 'Server error Occured', Action: 'Close', Class: "error" });
      });
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    const excelData: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(excelData, fileName + EXCEL_EXTENSION);
  }

  graph_update(parm: any) {
    let selected_date = this.set_graph_parm();
    this._service.getdata(this.serverControl.value, selected_date, selected_date).subscribe(res => {
      this.chart_data(res, selected_date, selected_date);
    },
      err => {
        this._MessageService.openSnackBar({ message: 'Data Not available for Selected Date', Action: 'Close', Class: "error" });
      });
  }

  set_graph_parm() {
    let dt = ((this.datepicker.value).toLocaleDateString()).split('/');
    let date = '';
    let mm = dt[0].toString().length < 2 ? '0' + dt[0].toString() : dt[0].toString()
    let dd = dt[1].toString().length < 2 ? '0' + dt[1].toString() : dt[1].toString()

    date = dt[2] + mm + dd;
    return date
  }

}

