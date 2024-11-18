import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../services/invoice-services.service';
// import * as html2pdf from 'html2pdf.js';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'ems-invoice-detail-main',
  templateUrl: './invoice-detail-main.component.html',
  styleUrls: ['./invoice-detail-main.component.scss']
})
export class InvoiceDetailMainComponent {
  companyDetail: any;
  invoiceDetail: any;
  imageUrl: any;

  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly loaderService: LoaderService,
    private readonly toastrService: ToastrService,
    private readonly storageService: StorageService
  ) {
    this.route.params.subscribe((res: any) => {
      if (res?.id) {
        this.getInvoice((Number(res.id)));
      }
    });
  }
  exportHTMLtoPDF() {
    const element = document.getElementById('invoice-container');
    const opt = {
      margin: 0,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // html2pdf().from(element).set(opt).save();
  }



  getInvoice(id: number) {
    this.loaderService.startLoading();
    this.invoiceService.getInvoiceDetailById(id).then(res => {
      if (res) {
        this.invoiceDetail = res;
        this.getLogo(this.invoiceDetail?.logo);
      }
      this.loaderService.stopLoading();
    }).catch(error => {
      this.loaderService.stopLoading();
      this.toastrService.error(error?.message);
    });
  }

  getLogo(fileKey: string) {
    this.storageService.getFileFromAWS(fileKey)
      .then((response: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(response);
      })
      .catch(error => {
        console.error('Failed to load image', error);
        this.toastrService.error('Failed to load image');
      });
  }

  ngOnDestroy() {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }

}
