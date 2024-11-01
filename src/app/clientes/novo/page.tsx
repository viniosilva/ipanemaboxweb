"use client";
import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Customer } from "@/model/customer";
import { createCustomer } from "@/api/ipanemaboxapi";
import { useRouter } from "next/navigation";

const saveCustomer = async (customer: Customer): Promise<Customer> => {
  return createCustomer(customer);
};

export default function CustomerNew() {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: [saveCustomer],
    mutationFn: saveCustomer,
  });

  if (mutation.isSuccess) {
    router.push(`/clientes/${mutation.data.id}`);
  }

  if (mutation.isError) {
    return (
      <div>
        Ocorreu um erro ao criar cliente: {mutation.error.message}
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-4 p-4 bg-white border border-gray-300 rounded-lg">
      <h1 className="text-xl">Cliente Novo</h1>

      <Box
        className="flex flex-col gap-4 pt-4"
        component="form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          mutation.mutate({ name: form.cname.value } as Customer);
        }}
      >
        <TextField
          label="Nome"
          name="cname"
          id="outlined-scustomerize-normal"
        />

        <div className="flex gap-4">
        <Button
            className="w-min"
            type="submit"
            variant="outlined"
            color="success"
          >
            Salvar
          </Button>
          <Button
            className="w-min"
            href="/clientes"
            variant="outlined"
            color="info"
          >
            Voltar
          </Button>
        </div>
      </Box>
    </main>
  );
}
