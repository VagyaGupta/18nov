import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice-services.service';
import { InvoiceDetailTable } from './invoiceDetailTable';
import { LovService } from '../services/lov.service';
import { ColumnDef } from '../common-utils/components/table/table.config';

@Component({
  selector: 'ems-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent {
  columnDefs: ColumnDef[];
  rowData: any[] = [];

  constructor(
    private readonly loaderService: LoaderService,
    private readonly toastrService: ToastrService,
    private readonly lovService: LovService,
    private readonly router: Router,
    private readonly invoiceService: InvoiceService) {
    this.columnDefs = InvoiceDetailTable({
      cellClicked: (data: any) => this.router.navigate([`app/invoiceDetail/details/${data.id}`]),
      services: {
        lovService: this.lovService
      }
    })
  }
  ngOnInit(): void {
    this.getinvoiceDetails();
  }


  addInvoice() {
    this.router.navigate([`app/invoiceDetail/addInvoice`]);
  }



  getinvoiceDetails() {
    this.loaderService.startLoading();
    this.invoiceService.getInvoiceDetails().then(res => {
      if (res) {
        this.rowData = res;
      }
      this.loaderService.stopLoading();
    }).catch(error => {
      this.loaderService.stopLoading();
      this.toastrService.error(error?.message);
    });
  }
}
