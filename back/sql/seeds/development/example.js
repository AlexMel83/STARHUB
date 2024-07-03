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
  
  exports.seed = async function (knex) {
    const seedExist = await knex("users").select("*").where({ id: 1 });
  
    if (!seedExist[0]) {
      const trx = await knex.transaction();
  
      try {
        await trx("users").insert(usersData);

        await trx.commit();
      } catch (error) {
        await trx.rollback();
        throw Error("Failed migration for fill seed data");
      }
    }
  };