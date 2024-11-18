import * as moment from "moment";
import { ColumnDef } from "../common-utils/components/table/table.config";

export const VendorDetailTable = (cellParams: any = null): ColumnDef[] => {
    return [
        {
            field: 'id',
            header: 'Id',
            hide: false,
            download: true,
            sortable: false
        },
        {
            field: 'name',
            header: 'Vendor Name',
            cellClicked: (data: any) => cellParams.cellClicked(data),
            cell: (params): string => {
                return params?.name ? params.name : '-';
            },
            hide: false,
            download: false,
            sortable: false
        },
        {
            field: 'email',
            header: 'Email',
            cell: (params): string => {
                return params?.email ? params.email : '-';
            },
            hide: false,
            download: false,
            sortable: false
        },
        {
            field: 'vendorNumber',
            header: 'Contact No.',
            cell: (params): string => {
                return params?.vendorNumber ? params.vendorNumber : '-';
            },
            hide: false,
            download: true,
            sortable: false
        },
        {
            field: 'cin',
            header: 'CIN',
            cell: (params): string => {
                return params?.cin ? params.cin : '-';
            },
            hide: false,
            download: true,
            sortable: false
        },
        {
            field: 'gstin',
            header: 'GSTIN',
            cell: (params): string => {
                return params?.gstin ? params.gstin : '-';
            },
            hide: false,
            download: true,
            sortable: false
        },
    ];
};
