"use client";
import React, { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TableFooter,
  Pagination,
  Button,
} from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomersListResponse } from "@/model/customer";
import { getCustomersList } from "@/api/ipanemaboxapi";
import Link from "next/link";

const fetchCustomersList = async (
  page: number,
  limit: number
): Promise<CustomersListResponse> => {
  return getCustomersList(page, limit);
};

export default function CustomersList() {
  const defaultLimit = 10;
  const router = useRouter();
  const params = useSearchParams();
  const [page, setPage] = useState<number>(Number(params.get("page") || 1));
  const [limit] = useState<number>(Number(params.get("limit") || defaultLimit));

  const {
    data: customers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["customersList", page, limit],
    queryFn: () => fetchCustomersList(page, limit),
    placeholderData: keepPreviousData,
  });

  async function handlePaginationOnChange(
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) {
    const url = new URL(window.location.href);
    url.searchParams.set("page", newPage.toString());
    url.searchParams.set("limit", limit.toString());
    router.replace(url.toString());

    setPage(newPage);
  }

  if (isLoading) {
    return (
      <main className="flex items-center justify-center h-full">
        <CircularProgress className="text-green-500" />
      </main>
    );
  }

  if (error) {
    return <div>Ocorreu um erro ao buscar os clientes: {error.message}</div>;
  }

  return (
    <main className="flex flex-col gap-4 p-4 bg-white border border-gray-300 rounded-lg">
      <h1 className="text-xl">Clientes</h1>
      <Button
        className="w-min text-nowrap"
        href="/clientes/novo"
        variant="outlined"
        color="primary"
      >
        Adicionar cliente
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="customers list">
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers?.data?.map((customer) => (
              <TableRow
                key={`customer_${customer.id}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  className="cursor-pointer hover:text-green-800 duration-300"
                  component="th"
                  scope="row"
                >
                  <Link href={`/clientes/${customer.id}`}>{customer.name}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {(customers?.metadata?.total_pages || 1) > 1 && (
              <tr>
                <td colSpan={1}>
                  <Pagination
                    className="flex justify-center py-2"
                    shape="rounded"
                    count={customers?.metadata?.total_pages || defaultLimit}
                    page={customers?.metadata?.current_page || 1}
                    onChange={handlePaginationOnChange}
                  />
                </td>
              </tr>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </main>
  );
}
