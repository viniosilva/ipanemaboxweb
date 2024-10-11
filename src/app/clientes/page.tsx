"use client";
import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { CustomersListResponse } from "@/model/customer";
import { getCustomersList } from "@/api/ipanemaboxapi";

const fetchCustomersList = async (): Promise<CustomersListResponse> => {
  return getCustomersList();
};

export default function CustomersList() {
  const {
    data: res,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["customersList"],
    queryFn: fetchCustomersList,
  });

  if (isLoading) {
    return (
      <main className="flex items-center justify-center h-full">
        <CircularProgress className="text-green-500" />
      </main>
    );
  }

  if (error) {
    return <div>Error loading customers: {error.message}</div>;
  }

  return (
    <main className="flex flex-col gap-4 p-4 bg-white border border-gray-300 rounded-lg">
      <h1 className="text-xl">Clientes</h1>
      <TableContainer component={Paper}>
        <Table aria-label="customers list">
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {res?.data?.map((row) => (
              <TableRow
                key={`customer_${row.id}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <Stack spacing={2}>
              <Pagination count={10} shape="rounded" />
              <Pagination count={10} variant="outlined" shape="rounded" />
            </Stack>
          </TableFooter>
        </Table>
      </TableContainer>
    </main>
  );
}
