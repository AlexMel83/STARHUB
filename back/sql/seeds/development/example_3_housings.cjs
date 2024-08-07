/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const housingsData = [
  {
    id: 1,
    type: "квартира",
    room_number: 3,
    floor: 5,
    floors: 5,
    area: 60,
    area_housing: 40,
    area_kitchen: 12,
    status: "здається",
  },
  {
    id: 2,
    type: "комерційна нерухомість",
    // room_number: ,
    floor: 1,
    floors: 2,
    area: 1300,
    // area_housing: 40,
    // area_kitchen: 12,
    status: "здається",
  },
  {
    id: 3,
    type: "комерційна нерухомість",
    // room_number: 3,
    floor: 1,
    floors: 3,
    area: 31,
    // area_housing: 40,
    // area_kitchen: 12,
    status: "здається",
  },
  {
    id: 4,
    type: "квартира",
    room_number: 2,
    floor: 3,
    floors: 5,
    area: 64,
    // area_housing: 40,
    area_kitchen: 6,
    status: "здається",
  },
  {
    id: 5,
    type: "квартира",
    room_number: 3,
    floor: 2,
    floors: 4,
    area: 70,
    area_housing: 47,
    area_kitchen: 8,
    status: "продається",
  },
  {
    id: 6,
    type: "квартира",
    room_number: 2,
    floor: 4,
    floors: 5,
    area: 63,
    area_housing: 52,
    area_kitchen: 11,
    status: "продається",
  },
];

const housing_addressesData = [
  {
    id: 1,
    housing_id: 1,
    address: "вул. Софійська 17, Старокостянтинів",
    location: "49.74990656050151, 27.183628902631437",
    state: "Хмельницька область",
    city: "Старокостянтинів",
    strite: "Софійська",
    building_number: 17,
    building_number_show: true,
  },
  {
    id: 2,
    housing_id: 2,
    address: "вул. Героїв Небесної Сотні, Старокостянтинів",
    location: "49.75210920479727, 27.19044228968502",
    state: "Хмельницька область",
    city: "Старокостянтинів",
    strite: "Героїв Небесної Сотні",
  },
  {
    id: 3,
    housing_id: 3,
    address: "вул. Грушевського 39, Старокостянтинів",
    location: "49.75985211743968, 27.220496153317658",
    state: "Хмельницька область",
    city: "Старокостянтинів",
    strite: "Грушевського",
    building_number: 39,
    building_number_show: true,
  },
  {
    id: 4,
    housing_id: 4,
    address: "вул. Миру, 19, Старокостянтинів",
    location: "49.757230314068885, 27.193507928156173",
    state: "Хмельницька область",
    city: "Старокостянтинів",
    strite: "Миру",
    building_number: 19,
    building_number_show: false,
  },
  {
    id: 5,
    housing_id: 5,
    address: "вул. Франка 37, Старокостянтинів",
    location: "49.75803864727243, 27.16743995754351",
    state: "Хмельницька область",
    city: "Старокостянтинів",
    strite: "Франка",
    building_number: 37,
    building_number_show: true,
  },
  {
    id: 6,
    housing_id: 6,
    address: "вул. Софійська 3, Старокостянтинів",
    location: "49.75562831028535, 27.184313731376545",
    state: "Хмельницька область",
    city: "Старокостянтинів",
    strite: "Софійська",
    building_number: 3,
    building_number_show: true,
  },
];

const housing_detailsData = [
  {
    id: 1,
    housing_id: 1,
    year_built: "2001-2010",
    wall_type: "з панелей",
    repair: "хороший",
    heating: "централізоване",
    hot_water: "бойлер",
    furnished: true,
    refrigerator: true,
    gas: true,
    dishwasher: true,
    view_yard: "внутрішній",
  },
  {
    id: 2,
    housing_id: 2,
    description:
      "Здам в оренду приміщення під виробництво, складу, ресторану і т.д. Є окремі приміщення від 20 м.кв. Сама забудова 1300 кв.м. Є світло 380В., вода, каналізація. Земля 21 сотка, приватизована.",
  },
  {
    id: 3,
    housing_id: 3,
    heating: "автономна котельня",
    furnished: true,
    description:
      "Пропонується в довгострокову оренду приміщення в Торговому Центрі Ясен. Розташоване в приміщені магазину ТЕХНОЛЮКС. Площа складається з 13, 4 м2 приміщення торгового і складського 18 м2. Поруч ринок, автовокзал",
  },
  {
    id: 4,
    housing_id: 4,
    year_built: "1980-1990",
    wall_type: "з цегли",
    repair: "косметичний ремонт",
    heating: "індивідуальне газове",
    furnished: true,
    refrigerator: true,
    washer: true,
    internet: true,
    tv: true,
    bath: true,
    description:
      "Довгострокова оренда квартири з індивідуальними опаленням, меблями та технікою . Поруч дитячий садок , школа , магазини, зупинка громадського транспорту. Зроблено косметичний ремонт",
  },
  {
    id: 5,
    housing_id: 5,
    repair: "косметичний ремонт",
    heating: "централізоване",
    hot_water: "централізоване",
    furnished: true,
    gas: true,
    internet: true,
    bath: true,
    view_yard: "внутрішній",
    description:
      "Продається затишна 3-кімнатна квартира по вул. Франка (Індійський). Зелений безпечний райончик міста. Квартира тепла, розташована на 2-поверсі, не кутова, загальна площа 70 кв. м., кухня 8 кв. м. Балкон і лоджія утеплені та засклені. Косметичний ремонт. Вікна виходять на 2 сторони будинку, одна з яких у двір. Є грядка зі сторони лоджії. Продається квартира частково з меблями. Кімнати роздільгі, санвузол теж роздільний! Комфортне розташування будинку, не над дорогою, в дворі дитячи майданчик що видно з вікна. Паркомісця є біля під'їзду. Близько школа, садочок, магазини, аптека, поліклініка, пошта, ліцей - все комфортно та зручно для спокійного постійного проживання. Сусіди добропорядні, чистий під'їзд та двір. Поряд зупинка з постійним рухом маршрутних автобусів.",
  },
  {
    id: 6,
    housing_id: 6,
    year_built: "2023",
    wall_type: "з цегли",
    insulation: "зовнішнє",
    heating: "централізоване",
    bomb_shelter: true,
    gas: true,
    view_yard: "внутрішній",
    description: `Терміново продається 2-кімнатна квартира від власника в ЖК Софіївський Партал. Строк здачі будинку - до вересня 2024 року.
- поверх 4/5;
- площа 63 м2;
- зовнішнє утеплення з оздобленням декоративною штукатуркою;
- Висота поверху 3 м;
- Опалення квартири індивідуальним двоконтурним газовим котлом з повним монтажем системи;
- Металопластикові вікна з двокамерним склопакетом;
- Лічильник газу, електроенергії, холодної води.
Місцезнаходження будинку у центрі , магазини, лікарні, торгові центри, школи, садочки, зупинка місцевого транспорту в межах пішохідної доступності`,
  },
];

const housing_when_no_electricityData = [{}];

exports.seed = async function (knex) {
  const seedExist = await knex("sneakers").select("*").where({ id: 1 });

  if (!seedExist[0]) {
    const trx = await knex.transaction();

    try {
      await trx("sneakers").insert(sneakersData);
      await trx.commit();
    } catch (error) {
      await trx.rollback();
      throw Error("Failed migration for fill seed data");
    }
  }
};
