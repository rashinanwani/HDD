import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    providers: [],
    declarations: [],
    exports: [
        FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ],
    // imports: [
    // FormsModule,
    // CommonModule,
    // BrowserModule,
    // HttpClientModule,
    // MatTableModule,
    // MatCheckboxModule,
    // MatPaginatorModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatSelectModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    // MatFormFieldModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MatPaginatorModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatProgressBarModule,
    // MatDividerModule,
    // MatProgressSpinnerModule,
    // MatSnackBarModule,
    // ],

})
export class SharedModule { }