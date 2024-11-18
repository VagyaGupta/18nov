import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { LovService } from '../services/lov.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'ems-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent {
  id:any;
  vendorDetails:any;

  constructor(
    private readonly loaderService: LoaderService,
    private readonly toastrService: ToastrService,
    private readonly lovService: LovService,
    private readonly router: Router,
    private readonly vendorService: VendorService,
    private readonly route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      if (res?.id) {
        this.id = res?.id;
        this.getvendorDetails(Number(res.id));
      }
    });
  }


  addvendor() {
    this.router.navigate([`app/vendor/addvendor`]);
  }



  getvendorDetails(id:number) {
    this.loaderService.startLoading();
    this.vendorService.getvendorDetailById(id).then(res => {
      if (res) {
        this.vendorDetails = res;
      }
      this.loaderService.stopLoading();
    }).catch(error => {
      this.loaderService.stopLoading();
      this.toastrService.error(error?.message);
    });
  }


  editvendor(){
    this.router.navigate([`app/vendor/editvendor/${this.id}`]);
  }


  deletevendor(){
    this.loaderService.startLoading();
    this.vendorService.deletevendorById(this.id).then(res => {
      if (res) {
        this.toastrService.success('Vendor deleted successfully');
        this.router.navigate([`app/vendor`]);
      }
      this.loaderService.stopLoading();
    }).catch(error => {
      this.router.navigate([`app/vendor`]);
      this.loaderService.stopLoading();
      this.toastrService.error(error?.message);
    });
  }
}
