import * as moment from "moment";
import { ColumnDef } from "../common-utils/components/table/table.config";

export const InvoiceDetailTable = (cellParams: any = null): ColumnDef[] => {
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
            header: 'Invoice Name',
            cellClicked: (data: any) => cellParams.cellClicked(data),
            cell: (params): string => {
                return params?.name ? params.name : '-';
            },
            hide: false,
            download: true,
            sortable: false
        },
        {
            field: 'paymentDate',
            header: 'Payment Date',
            cell: (params): string => {
                return params?.paymentDate ? params.paymentDate : '-';
            },
            // comparator: (valueA, valueB): number => {
            //     if (!valueA && !valueB) { return 0; }
            //     if (!valueA) { valueA = 0; }
            //     if (!valueB) { valueB = 0; }
            //     if (valueA > valueB) { return 1; }
            //     if (valueA < valueB) { return -1; }
            //     return 0;
            // },
            hide: false,
            download: false,
            sortable: false
        },
        {
            field: 'dueDate',
            header: 'Due Date',
            cell: (params): string => {
                return params?.dueDate ? moment(params.dueDate).format('DD/MM/YYYY') : '-';
            },
            comparator: (valueA, valueB): number => {
                if (!valueA && !valueB) { return 0; }
                if (!valueA) { valueA = 0; }
                if (!valueB) { valueB = 0; }
                if (valueA > valueB) { return 1; }
                if (valueA < valueB) { return -1; }
                return 0;
            },
            hide: false,
            download: false,
            sortable: false,
        }
    ];
};
