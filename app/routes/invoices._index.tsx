import { InvoicesDesktop } from "@/components/templates.invoices.desktop";
import { InvoicesMobile } from "@/components/templates.invoices.mobile";
import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";

type Props = {};

export const meta: MetaFunction = () => {
  return [
    { title: "Invoices - Invoice Manager" },
    {
      property: "og:title",
      content: "Invoices - Invoice Manager",
    },
    {
      property: "og:description",
      content: "A list of all my past and current invoices",
    },
    {
      name: "description",
      content: "A list of all my past and current invoices",
    },
  ];
};

function PageRoute() {
  return (
    <main aria-labelledby="page-heading" className="w-full">
      <div className="mt-12" />

      <InvoicesDesktop className="hidden flex-col gap-12 sm:flex" />
      <InvoicesMobile className="flex flex-col gap-12 sm:hidden" />
    </main>
  );
}

export default PageRoute;

type Order = {
  slug: string;
  total: number;
  clientName: string;
  status: string;
  paymentDue: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const statuses = url.searchParams.getAll("status");

  const response = await import("../database/db.json").then(
    (response) => response.default,
  );

  const invoices =
    statuses.length > 0 ?
      response.filter((item) =>
        statuses.some((status) => item.status === status),
      )
    : response;

  return json({ invoices: invoices ?? [] });
}
