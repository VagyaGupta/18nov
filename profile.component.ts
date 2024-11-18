import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../services/loader.service';
import { EmployeeService } from '../services/employee.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { assetTable, bankTable } from '../dashboard/dashboardTable';
import { LovService } from 'projects/new-ems/src/app/services/lov.service';
import { ColumnDef } from '../common-utils/components/table/table.config';
import { ActivatedRoute, Router } from '@angular/router';
import { FINANCIAL_DOC_TYPE, PROFILE_TAB_ENUM } from '../common-utils/constants';
import { BankService } from '../services/bank.service';
import { AddBankComponent } from '../bank/add-bank/add-bank.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ems-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  employeeDetails: any;
  email: any;
  assetsRowData: any[] = [];
  assetsColumnDefs: ColumnDef[];
  activeTabIndex = 0;
  financialDetail: any;
  bankRowData: any;
  bankColumnDefs: ColumnDef[];

  constructor(
    private readonly loaderService: LoaderService,
    private readonly toastrService: ToastrService,
    private readonly employeeService: EmployeeService,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly lovService: LovService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly bankService: BankService,
    public dialog: MatDialog
  ) {
    this.breadcrumbService.set('@profile', 'Profile');
    this.route.url.subscribe(value => {
      switch (value?.[0]?.path) {
        case PROFILE_TAB_ENUM.FINANCIAL.path:
          this.activeTabIndex = 1;
          this.bankColumnDefs = bankTable();
          this.getFinancialDetails();
          this.getBankDetails();
          break;
        default:
          this.activeTabIndex = 0;
          this.assetsColumnDefs = assetTable({
            services: {
              lovService: this.lovService
            }
          });
          this.getEmployeeData();
          this.getAssetDetails();
          break;
      }
    });
  }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('authentication'))?.username;
  }

  tabChange(index: number) {
    this.activeTabIndex = index;
    switch (this.activeTabIndex) {
      case 1:
        this.router.navigate([`app/profile/${PROFILE_TAB_ENUM.FINANCIAL.path}`]);
        break;
      default:
        this.router.navigate([`app/profile/${PROFILE_TAB_ENUM.DETAILS.path}`]);
        break;
    }
  }

  getEmployeeData() {
    this.loaderService.startLoading();
    this.employeeService.getEmployeeDetailsByUserId(JSON.parse(localStorage.getItem('authentication') as any)?.id).then(res => {
      if (res) {
        this.employeeDetails = res;
        this.employeeDetails.type = this.lovService.getDisplayText('employeeType', this.employeeDetails.type);
        this.employeeDetails.jobLocation = this.lovService.getDisplayText('jobLocation', this.employeeDetails.jobLocation);
        this.employeeDetails.jobTitle = this.lovService.getDisplayText('jobTitle', this.employeeDetails.jobTitle);
        this.loaderService.stopLoading();
      }
    }).catch(_error => {
      this.loaderService.stopLoading();
      this.toastrService.error("Error while getting employee data");
    });
  }

  getAssetDetails(showToastr: boolean = false) {
    this.loaderService.startLoading();
    const id = this.employeeService.employeeDetails?.id;
    if (id) {
      this.employeeService.getAssetDetailByEmployee(id).then((res) => {
        if (res) {
          this.assetsRowData = res;
          if (showToastr) {
            this.toastrService.success("Refreshed");
          }
          this.loaderService.stopLoading();
        }
      }).catch(error => {
        this.loaderService.stopLoading();
        this.toastrService.error(error?.message);
      });
    }
  }

  getFinancialDetails(showToastr: boolean = false){
    this.loaderService.startLoading();
    const id = this.employeeService.employeeDetails?.id;
    if (id) {
      this.employeeService.getFinancialDetailByEmployee(id).then((res) => {
        if (res) {
          this.financialDetail = {
            aadharNumber: res.find(fd => fd.financialDocType === FINANCIAL_DOC_TYPE.AADHAR)?.financialDocNumber,
            panNumber: res.find(fd => fd.financialDocType === FINANCIAL_DOC_TYPE.PAN)?.financialDocNumber,
            uanNumber: res.find(fd => fd.financialDocType === FINANCIAL_DOC_TYPE.UAN)?.financialDocNumber,
            passportNumber: res.find(fd => fd.financialDocType === FINANCIAL_DOC_TYPE.PASSPORT)?.financialDocNumber,
            epfNumber: res.find(fd => fd.financialDocType === FINANCIAL_DOC_TYPE.EPF)?.financialDocNumber,
          }
          if (showToastr) {
            this.toastrService.success("Refreshed");
          }
          this.loaderService.stopLoading();
        }
      }).catch(error => {
        this.loaderService.stopLoading();
        this.toastrService.error(error?.message);
      });
    }
  }

  getBankDetails(showToastr: boolean = false) {
    this.loaderService.startLoading();
    this.bankService.getBanks().then(res => {
      if (res) {
        this.bankRowData = res;
      }
      this.loaderService.stopLoading();
    }).catch(error => {
      this.loaderService.stopLoading();
      this.toastrService.error(error?.message);
    });
  }

  getDisplayText(lov: string, value: number) {
    return this.lovService.getDisplayText(lov, value);
  }

  addBank() {
    const dialogRef = this.dialog.open(AddBankComponent, {
      width: '60vw',
      data: {
        employeeId: this.employeeService.employeeDetails?.id,
      },
      backdropClass: 'blurBackdrop'
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getBankDetails();
      }
    });
  }

}
