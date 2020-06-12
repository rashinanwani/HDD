import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export declare type panelClasstype = 'Ok' | 'error';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) { }

  Options: snackBarOptions;

  openSnackBar(_snackBarOptions: snackBarOptions) {
    this.snackBar.open(_snackBarOptions.message, _snackBarOptions.Action, {
     duration: 2000,
      panelClass: [_snackBarOptions.Class],
      horizontalPosition: 'center'
    });
  }
}

export interface snackBarOptions {
  message: string;
  Action: string;
  Class: panelClasstype;
}

