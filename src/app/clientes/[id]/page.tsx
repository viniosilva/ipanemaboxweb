"use client";
import React, { use, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { Customer } from "@/model/customer";
import {
  deleteCustomer,
  getCustomerDetail,
  updateCustomer,
} from "@/api/ipanemaboxapi";
import { useRouter } from "next/navigation";

const fetchCustomerDetail = async (id: number): Promise<Customer> => {
  return getCustomerDetail(id);
};

const saveCustomer = async (customer: Customer): Promise<Customer> => {
  return updateCustomer(customer);
};

interface Props {
  params: Promise<{ id: number }>;
}

export default function CustomerDetail(props: Props) {
  const { id } = use(props.params);
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const mutation = useMutation({
    mutationKey: [saveCustomer],
    mutationFn: saveCustomer,
  });

  const {
    data: customer,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["customerDetail", id],
    queryFn: () => fetchCustomerDetail(id),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <main className="flex items-center justify-center h-full">
        <CircularProgress className="text-green-500" />
      </main>
    );
  }

  if (mutation.isSuccess) {
    alert("Cliente salvo com sucesso");
  }

  if (isError) {
    return (
      <div>
        Ocorreu um erro ao buscar os detalhes do cliente: {error.message}
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-4 p-4 bg-white border border-gray-300 rounded-lg">
      <h1 className="text-xl">Detalhes do Cliente</h1>

      <Box
        className="flex flex-col gap-4 pt-4"
        component="form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          if (!customer) return;

          const form = e.target as HTMLFormElement;
          mutation.mutate({ id: customer.id, name: form.cname.value });
        }}
      >
        <TextField
          label="Nome"
          name="cname"
          id="outlined-scustomerize-normal"
          defaultValue={customer?.name}
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
            type="button"
            variant="outlined"
            color="warning"
            onClick={() => setConfirmDelete(true)}
            // onClick={async () => {
            //   if (!customer) return;
            //   await deleteCustomer(customer.id);
            //   router.push("/clientes");
            // }}
          >
            Remover
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
        <Dialog
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            Você tem certeza que deseja remover este cliente?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(false)}>Cancelar</Button>
            <Button
              onClick={async () => {
                if (!customer) return;
                await deleteCustomer(customer.id);
                router.push("/clientes");
              }}
              autoFocus
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </main>
  );
}
