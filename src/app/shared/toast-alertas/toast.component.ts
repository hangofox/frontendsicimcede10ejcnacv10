import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [MessageService]
})
export class ToastComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() tipoMsj: number = 0;
  @Input() titulo: string = "";
  @Input() mensaje: string = "";

  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) { }
  
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.tipoMsj == 1) {
      this.msjExito(this.titulo, this.mensaje);
    } else if (this.tipoMsj == 2) {
      this.msjWarn(this.titulo, this.mensaje);
    } else if (this.tipoMsj == 3) {
      this.msjError(this.titulo, this.mensaje);
    }
  }
  
  msjExito(titulo: string, detalle: string) {
    this.messageService.add({ severity: 'success', summary: titulo, detail: detalle, life: 4000 });//Exito.
  }

  msjWarn(titulo: string, detalle: string) {
    this.messageService.add({ severity: 'warn', summary: titulo, detail: detalle, life: 4000 });//Advertencia.
  }

  msjError(titulo: string, detalle: string) {
    this.messageService.add({ severity: 'error', summary: titulo, detail: detalle, life: 4000 });//Error.
  }
  
  clear() {
    this.messageService.clear();
  }

  si_confirmacion() {
    this.messageService.clear('c');
  }
  
  no_confirmacion() {
    this.messageService.clear('c');
  }
  
  confirmacion() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Confirmación de procedimiento.', detail: 'Esta seguro de realizar este procedimiento?' });
  }
  
  /*showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  }
  
  showInfo() {
    this.messageService.add({severity:'info', summary: 'Info', detail: 'Message Content'});
  }
  
  showWarn() {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Message Content'});
  }
  
  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
  }
  
  showTopLeft() {
    this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: 'Message Content'});
  }
  
  showTopCenter() {
    this.messageService.add({key: 'tc', severity:'info', summary: 'Info', detail: 'Message Content'});
  }
  
  showBottomCenter() {
    this.messageService.add({key: 'bc', severity:'info', summary: 'Info', detail: 'Message Content'});
  }
  
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
  }
  
  showMultiple() {
    this.messageService.addAll([
        {severity:'info', summary:'Message 1', detail:'Message Content'},
        {severity:'info', summary:'Message 2', detail:'Message Content'},
        {severity:'info', summary:'Message 3', detail:'Message Content'}
    ]);
  }
  
  showSticky() {
    this.messageService.add({severity:'info', summary: 'Sticky', detail: 'Message Content', sticky: true});
  }
  
  onConfirm() {
    this.messageService.clear('c');
  }
  
  onReject() {
    this.messageService.clear('c');
  }
  
  clear() {
    this.messageService.clear();
  }*/
}
