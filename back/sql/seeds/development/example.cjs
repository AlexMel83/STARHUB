/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const usersData = [
  {
    email: "example1@example.com",
    password: "$$2b$04$ZJj/HLhh.QF1LLJIDGdT9eijg17/yon.eChNPPcs.Un8j6CU00ohW",
    role: "user",
    isactivated: "true",
  },
  {
    email: "example2@example.com",
    password: "$2b$04$ZJj/HLhh.QF1LLJIDGdT9eijg17/yon.eChNPPcs.Un8j6CU00ohW",
    role: "manager",
    isactivated: "true",
  },
  {
    email: "example3@example.com",
    password: "$2b$04$ZJj/HLhh.QF1LLJIDGdT9eijg17/yon.eChNPPcs.Un8j6CU00ohW",
    role: "manager",
    isactivated: "true",
  },
  {
    email: "admin@test.com",
    password: "$2b$04$tQRegvM0dP/R0gRh72nzJORrw401cKADsrZOppKQHaCwDeUkn/iKK",
    role: "admin",
    isactivated: "true",
    phone: "380987654321",
    name: "Test",
    surname: "User",
  },
  {
    email: "admin4@admin.com",
    password: "$2b$04$ZJj/HLhh.QF1LLJIDGdT9eijg17/yon.eChNPPcs.Un8j6CU00ohW",
    role: "admin",
    isactivated: "true",
  },
  {
    email: "example5@example.com",
    password: "$2b$04$ZJj/HLhh.QF1LLJIDGdT9eijg17/yon.eChNPPcs.Un8j6CU00ohW",
    role: "manager",
    isactivated: "true",
  },
  {
    email: "example6@example.com",
    password: "$2b$04$ZJj/HLhh.QF1LLJIDGdT9eijg17/yon.eChNPPcs.Un8j6CU00ohW",
    role: "manager",
    isactivated: "true",
  },
  {
    email: "dariazhur89@gmail.com",
    password: "$2b$04$7TfkL/l51rWdgD/KZuDste4UcdOTAltQtVoM9hZvuGalnZmq/r73i",
    role: "user",
    isactivated: "true",
    name: "Дар'я",
    surname: "Журавльова",
  },
  {
    email: "dimatuzkoff@gmail.com",
    password: "$2b$04$YMc0VSwAVIZ15EJCm/KmUONEo9jIApUExxz50skhsBuQEDeLBpAme",
    role: "manager",
    isactivated: "true",
    name: "Дмитро",
    surname: "Тузков",
  },
];

const customersData = [
  {
    name: "Спортмастер",
    email: "dsd@dsd.ua",
    avatar_url: "https://cloud.appwrite.io/v1/storage/buckets/storage/files/5f8ca226-b7e2-4802-817b-935dc3321798/download?project=668181210001356c2833",
    from_source: "iz gazet",
  },
  {
    name: "Facebook",
    email: "dsds@sas.ya",
    avatar_url: "https://cloud.appwrite.io/v1/storage/buckets/storage/files/avatar/view?project=668181210001356c2833&mode=admin",
    from_source: "From NY",
  },
  {
    name: "мусоровоз",
    email: "fdfd@dss.ya",
    avatar_url: "https://cloud.appwrite.io/v1/storage/buckets/storage/files/74887ba2-f139-423e-80ea-a813dd586b60/download?project=668181210001356c2833",
    from_source: "jeko",
  }
];

const dealsData = [
  {
    name: "Настроить рекламу",
    price: 32323,
    status: "done",
    customer_id: 1,
  },
  {
    name: "Настроить рекламу",
    price: 32323,
    status: "produced",
    customer_id: 1,
  },
  {
    name: "Покрасить стены",
    price: 34000,
    status: "todo",
    customer_id: 2,
  },
  {
    name: "вынести мусор",
    price: 35,
    status: "to-be-agreed",
    customer_id: 3,
  },
];

exports.seed = async function (knex) {
  const seedExist = await knex("users").select("*").where({ id: 1 });

  if (!seedExist[0]) {
    const trx = await knex.transaction();

    try {
      await trx("users").insert(usersData);
      await trx("customers").insert(customersData);
      await trx("deals").insert(dealsData);

      await trx.commit();
    } catch (error) {
      await trx.rollback();
      throw Error("Failed migration for fill seed data");
    }
  }
};
