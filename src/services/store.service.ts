import { prisma } from "../../prisma/client";

interface StoreData {
  name: string;
}

interface AdminData {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}


export const createStoreWithAdmin = async (storeData: StoreData, adminData: AdminData) => {
  const { name } = storeData;
  const { firstName, lastName, phone, password } = adminData;

  const role = await prisma.role.findUnique({
    where: {
      name: "ADMIN",
    },
  });

  if (!role) {
    throw new Error('Role "ADMIN" not found');
  }

  const store = await prisma.store.create({
    data: {
      name,
      users: {
        create: [
          {
            firstName,
            lastName,
            phone,
            password,
            roleId: role.id,
          },
        ],
      },
    },
  });

  return store;
};



export const getAllStores = async () => {
  const stores = await prisma.store.findMany();
  return stores;
};


export const getStoreById = async (id: string) => {
  const store = await prisma.store.findUnique({
    where: {
      id,
    },
  });
  return store;
};