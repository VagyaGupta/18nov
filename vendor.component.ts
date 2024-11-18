import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { LovService } from '../services/lov.service';
import { Router } from '@angular/router';
import { ColumnDef } from '../common-utils/components/table/table.config';
import { VendorDetailTable } from './vendorDetailTable';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'ems-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent {
  columnDefs: ColumnDef[];
  rowData: any[] = [];

  constructor(
    private readonly loaderService: LoaderService,
    private readonly toastrService: ToastrService,
    private readonly lovService: LovService,
    private readonly router: Router,
    private readonly vendorService: VendorService) {
    this.columnDefs = VendorDetailTable({
      cellClicked: (data: any) => this.router.navigate([`app/vendor/details/${data.id}`]),
      services: {
        lovService: this.lovService
      }
    })
  }
  ngOnInit(): void {
    this.getinvoiceDetails();
  }


  addvendor() {
    this.router.navigate([`app/vendor/addvendor`]);
  }



  getinvoiceDetails() {
    this.loaderService.startLoading();
    this.vendorService.getvendorDetail().then(res => {
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
