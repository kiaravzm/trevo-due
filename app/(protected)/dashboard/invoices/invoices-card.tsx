"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { FileText } from "lucide-react";
import { t, invoiceStatusLabel } from "@/lib/i18n";

import { InvoiceCreateOverlay } from "./invoice-create-overlay";
import { InvoiceListItem } from "./invoice-list-item";

type Invoice = {
  id: string;
  number: string;
  status: string;
  amount_cents: number;
  currency: string;
  due_date: string | null;
  customer_id: string | null;
  reminders_enabled: boolean;
};

type Customer = { id: string; name: string };

type InvoicesCardProps = {
  invoices: Invoice[] | null;
  customers: Customer[];
  limitReached: boolean;
};

type SortBy = "value" | "date" | "clientName";
type SortDir = "asc" | "desc";

const SORT_OPTIONS: { value: string; sortBy: SortBy; sortDir: SortDir }[] = [
  { value: "value-asc", sortBy: "value", sortDir: "asc" },
  { value: "value-desc", sortBy: "value", sortDir: "desc" },
  { value: "date-asc", sortBy: "date", sortDir: "asc" },
  { value: "date-desc", sortBy: "date", sortDir: "desc" },
  { value: "clientName-asc", sortBy: "clientName", sortDir: "asc" },
  { value: "clientName-desc", sortBy: "clientName", sortDir: "desc" },
];

function getSortOptionLabel(value: string): string {
  const opt = SORT_OPTIONS.find((o) => o.value === value);
  if (!opt) return value;
  const field =
    opt.sortBy === "value"
      ? t("invoice.filters.sortValue")
      : opt.sortBy === "date"
        ? t("invoice.filters.sortDate")
        : t("invoice.filters.sortClientName");
  const dir = opt.sortDir === "asc" ? t("invoice.filters.asc") : t("invoice.filters.desc");
  return `${field} (${dir})`;
}

export function InvoicesCard({
  invoices,
  customers,
  limitReached,
}: InvoicesCardProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [clientId, setClientId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortValue, setSortValue] = useState("date-desc");
  const router = useRouter();

  const handleCreateSuccess = () => {
    setCreateOpen(false);
    router.refresh();
  };

  const { sortBy, sortDir } = useMemo(() => {
    const opt = SORT_OPTIONS.find((o) => o.value === sortValue) ?? SORT_OPTIONS[2];
    return { sortBy: opt.sortBy, sortDir: opt.sortDir };
  }, [sortValue]);

  const filteredAndSortedInvoices = useMemo(() => {
    if (!invoices) return [];
    let list = [...invoices];

    if (periodStart) {
      list = list.filter((inv) => {
        const d = inv.due_date ?? "";
        return d >= periodStart && (!periodEnd || d <= periodEnd);
      });
    }
    if (periodEnd && !periodStart) {
      list = list.filter((inv) => {
        const d = inv.due_date ?? "";
        return d <= periodEnd;
      });
    }

    if (clientId) {
      list = list.filter((inv) => inv.customer_id === clientId);
    }

    if (statusFilter) {
      list = list.filter((inv) => inv.status === statusFilter);
    }

    const getClientName = (inv: Invoice) =>
      customers.find((c) => c.id === inv.customer_id)?.name ?? "";

    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "value") {
        cmp = a.amount_cents - b.amount_cents;
      } else if (sortBy === "date") {
        const da = a.due_date ?? "9999-12-31";
        const db = b.due_date ?? "9999-12-31";
        cmp = da.localeCompare(db);
      } else {
        cmp = getClientName(a).localeCompare(getClientName(b));
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [invoices, customers, periodStart, periodEnd, clientId, statusFilter, sortBy, sortDir]);

  const hasActiveFilters =
    !!periodStart || !!periodEnd || !!clientId || !!statusFilter || sortValue !== "date-desc";

  const clearFilters = () => {
    setPeriodStart("");
    setPeriodEnd("");
    setClientId("");
    setStatusFilter("");
    setSortValue("date-desc");
  };

  return (
    <>
      <Card className="shadow-soft">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{t("invoice.savedInvoices")}</CardTitle>
            <CardDescription>{t("invoice.savedDescription")}</CardDescription>
          </div>
          <Button
            onClick={() => setCreateOpen(true)}
            disabled={limitReached}
          >
            {t("invoice.createInvoice")}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {invoices && invoices.length > 0 && (
            <div className="flex flex-col gap-6 rounded-lg border border-border bg-muted/30 p-4">
              <div className="space-y-2">
                <Label htmlFor="filter-period-start">{t("invoice.filters.period")}</Label>
                <div className="flex max-w-md gap-3">
                  <Input
                    id="filter-period-start"
                    type="date"
                    value={periodStart}
                    onChange={(e) => setPeriodStart(e.target.value)}
                    className="min-w-0 flex-1"
                    aria-label={t("invoice.filters.period")}
                  />
                  <Input
                    id="filter-period-end"
                    type="date"
                    value={periodEnd}
                    onChange={(e) => setPeriodEnd(e.target.value)}
                    className="min-w-0 flex-1"
                    aria-label={t("invoice.filters.period")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:gap-6">
                <div className="min-w-0 space-y-2">
                  <Label htmlFor="filter-client">{t("invoice.filters.client")}</Label>
                  <Select
                    id="filter-client"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    aria-label={t("invoice.filters.client")}
                  >
                    <option value="">{t("invoice.filters.all")}</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="min-w-0 space-y-2">
                  <Label htmlFor="filter-status">{t("invoice.filters.status")}</Label>
                  <Select
                    id="filter-status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label={t("invoice.filters.status")}
                  >
                    <option value="">{t("invoice.filters.all")}</option>
                    <option value="open">{invoiceStatusLabel("open")}</option>
                    <option value="paid">{invoiceStatusLabel("paid")}</option>
                    <option value="overdue">{invoiceStatusLabel("overdue")}</option>
                  </Select>
                </div>
                <div className="min-w-0 space-y-2">
                  <Label htmlFor="filter-sort">{t("invoice.filters.sortBy")}</Label>
                  <Select
                    id="filter-sort"
                    value={sortValue}
                    onChange={(e) => setSortValue(e.target.value)}
                    aria-label={t("invoice.filters.sortBy")}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {getSortOptionLabel(opt.value)}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex items-end">
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                      {t("invoice.filters.clearFilters")}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {filteredAndSortedInvoices.length > 0 ? (
            <>
              <div className="hidden grid-cols-[1fr,1fr,1fr,1fr,1fr,auto] gap-4 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid">
                <span>{t("invoice.numberHeader")}</span>
                <span>{t("common.status")}</span>
                <span>{t("common.amount")}</span>
                <span>{t("common.dueDate")}</span>
                <span>{t("common.client")}</span>
                <span className="w-10" aria-hidden />
              </div>
              {filteredAndSortedInvoices.map((invoice) => (
                <InvoiceListItem
                  key={invoice.id}
                  invoice={invoice}
                  customers={customers}
                />
              ))}
            </>
          ) : invoices && invoices.length > 0 ? (
            <EmptyState
              icon={FileText}
              title={t("invoice.noInvoicesMatchFilters")}
              description={t("invoice.pageDescription")}
              action={
                <Button variant="outline" onClick={clearFilters}>
                  {t("invoice.filters.clearFilters")}
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={FileText}
              title={t("invoice.noInvoicesYet")}
              description={t("invoice.pageDescription")}
              action={
                !limitReached && (
                  <Button onClick={() => setCreateOpen(true)}>
                    {t("invoice.createInvoice")}
                  </Button>
                )
              }
            />
          )}
        </CardContent>
      </Card>
      {!limitReached && (
        <InvoiceCreateOverlay
          open={createOpen}
          onOpenChange={setCreateOpen}
          customers={customers}
          onSuccess={handleCreateSuccess}
        />
      )}
    </>
  );
}
