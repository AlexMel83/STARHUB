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

const housing_when_no_electricityData = [
  {
    id: 1,
    housing_id: 4,
    heating_works: true,
    water_supply: true,
  },
];

const housing_planning_featuresData = [
  {
    id: 1,
    housing_id: 1,
    bathroom: "роздільний санвузол",
    balcony_loggia: true,
  },
  {
    id: 2,
    housing_id: 4,
    bathroom: "роздільний санвузол",
    balcony_loggia: true,
  },
  {
    id: 3,
    housing_id: 5,
    bathroom: "роздільний санвузол",
    balcony_loggia: true,
  },
];

const housing_infrastructuresData = [
  {
    id: 1,
    housing_id: 2,
    parking: true,
  },
  {
    id: 2,
    housing_id: 4,
    transport: "Зупинка транспорту",
    school: "Школа, Дитячий садок",
    parking: true,
    store: "Аптека, Супермаркет, ТРЦ, Відділення пошти, Магазин, кіоск",
    recreation: "Ресторан, кафе, Парк, зелена зона",
    other: "Дитячий майданчик",
  },
  {
    id: 3,
    housing_id: 6,
    parking: true,
  },
];

const housing_securityData = [
  {
    id: 1,
    housing_id: 1,
    intercom: true,
  },
];

const housing_owners_representativesData = [
  {
    id: 1,
    housing_id: 1,
    user_id: 1,
  },
  {
    id: 2,
    housing_id: 2,
    user_id: 1,
  },
  {
    id: 3,
    housing_id: 3,
    user_id: 1,
  },
  {
    id: 4,
    housing_id: 4,
    user_id: 1,
  },
  {
    id: 5,
    housing_id: 5,
    user_id: 1,
  },
  {
    id: 6,
    housing_id: 6,
    user_id: 1,
  },
];

const housing_price_historyData = [
  {
    id: 1,
    housing_id: 1,
    price: 10000,
    currency: "UAH",
  },
  {
    id: 2,
    housing_id: 2,
    price: 100,
    currency: "UAH",
  },
  {
    id: 3,
    housing_id: 3,
    price: 3720,
    currency: "UAH",
    comment: "Додатково плата по лічильникам і за опалення",
  },
  {
    id: 4,
    housing_id: 4,
    price: 6000,
    currency: "UAH",
  },
  {
    id: 5,
    housing_id: 5,
    price: 34500,
    currency: "USD",
  },
  {
    id: 6,
    housing_id: 6,
    price: 25500,
    currency: "USD",
  },
];

const housing_advertisementsData = [
  {
    id: 1,
    housing_id: 1,
    platform: "dom.ria",
    url: "https://dom.ria.com/uk/realty-dolgosrochnaya-arenda-kvartira-starokonstantinov-sofiyskaya-ulitsa-32048596.html",
  },
  {
    id: 2,
    housing_id: 2,
    platform: "dom.ria",
    url: "https://dom.ria.com/uk/realty-dolgosrochnaya-arenda-kommercheskoe-pomeschenie-starokonstantinov-geroev-nebesnoy-sotni-ulitsa-32050760.html",
  },
  {
    id: 3,
    housing_id: 3,
    platform: "dom.ria",
    url: "https://dom.ria.com/uk/realty-dolgosrochnaya-arenda-kommercheskoe-pomeschenie-starokonstantinov-starokonstantinov-grushevskogo-ulitsa-30741548.html",
  },
  {
    id: 4,
    housing_id: 4,
    platform: "olx",
    url: "https://www.olx.ua/d/uk/obyavlenie/zdam-kvartiru-v-orendu-IDWrk0G.html",
  },
  {
    id: 5,
    housing_id: 5,
    platform: "dom.ria",
    url: "https://dom.ria.com/uk/realty-prodaja-kvartira-starokonstantinov-franka-ulitsa-32019338.html",
  },
  {
    id: 6,
    housing_id: 6,
    platform: "dom.ria",
    url: "https://dom.ria.com/uk/realty-prodaja-kvartira-starokonstantinov-starokonstantinov-sofievskaya-ulitsa-31635420.html",
  },
];

const housing_photosData = [
  {
    id: 1,
    housing_id: 1,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kvartira-starokonstantinov-sofiyskaya-ulitsa__303895835xg.webp",
  },
  {
    id: 2,
    housing_id: 1,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kvartira-starokonstantinov-sofiyskaya-ulitsa__303895834xg.webp",
  },
  {
    id: 3,
    housing_id: 1,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kvartira-starokonstantinov-sofiyskaya-ulitsa__303895836xg.webp",
  },
  {
    id: 4,
    housing_id: 1,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kvartira-starokonstantinov-sofiyskaya-ulitsa__303895837xg.webp",
  },
  {
    id: 5,
    housing_id: 1,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kvartira-starokonstantinov-sofiyskaya-ulitsa__303895839xg.webp",
  },
  {
    id: 6,
    housing_id: 1,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kvartira-starokonstantinov-sofiyskaya-ulitsa__303895840xg.webp",
  },
  {
    id: 7,
    housing_id: 2,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kommercheskoe-pomeschenie-starokonstantinov-geroev-nebesnoy-sotni-ulitsa__303925251fx.jpg",
  },
  {
    id: 8,
    housing_id: 2,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kommercheskoe-pomeschenie-starokonstantinov-geroev-nebesnoy-sotni-ulitsa__303925286xg.webp",
  },
  {
    id: 9,
    housing_id: 2,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kommercheskoe-pomeschenie-starokonstantinov-geroev-nebesnoy-sotni-ulitsa__303925299xg.webp",
  },
  {
    id: 10,
    housing_id: 2,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kommercheskoe-pomeschenie-starokonstantinov-geroev-nebesnoy-sotni-ulitsa__303925315xg.webp",
  },
  {
    id: 11,
    housing_id: 2,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kommercheskoe-pomeschenie-starokonstantinov-geroev-nebesnoy-sotni-ulitsa__303925328xg.webp",
  },
  {
    id: 12,
    housing_id: 3,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kommercheskoe-pomeschenie-starokonstantinov-starokonstantinov-grushevskogo-ulitsa__284657386fx.jpg",
  },
  {
    id: 13,
    housing_id: 3,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kommercheskoe-pomeschenie-starokonstantinov-starokonstantinov-grushevskogo-ulitsa__295588812xg.webp",
  },
  {
    id: 14,
    housing_id: 3,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kommercheskoe-pomeschenie-starokonstantinov-starokonstantinov-grushevskogo-ulitsa__295588813xg.webp",
  },
  {
    id: 15,
    housing_id: 3,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/dolgosrochnaya-arenda-kommercheskoe-pomeschenie-starokonstantinov-starokonstantinov-grushevskogo-ulitsa__295588815xg.webp",
  },
  {
    id: 16,
    housing_id: 4,
    url: "https://ireland.apollo.olxcdn.com/v1/files/ivx4jivvsc431-UA/image;s=1000x700",
  },
  {
    id: 17,
    housing_id: 4,
    url: "https://ireland.apollo.olxcdn.com/v1/files/067z7g2orf6g-UA/image;s=1000x700",
  },
  {
    id: 18,
    housing_id: 4,
    url: "https://ireland.apollo.olxcdn.com/v1/files/jgxmkdpi2vtm1-UA/image;s=1000x700",
  },
  {
    id: 19,
    housing_id: 4,
    url: "https://ireland.apollo.olxcdn.com/v1/files/rdnchemo16hl2-UA/image;s=1000x700",
  },
  {
    id: 20,
    housing_id: 4,
    url: "https://ireland.apollo.olxcdn.com/v1/files/518l9a1xqwpc1-UA/image;s=1000x700",
  },
  {
    id: 21,
    housing_id: 5,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-starokonstantinov-franka-ulitsa__303505649fl.webp",
  },
  {
    id: 22,
    housing_id: 5,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-starokonstantinov-franka-ulitsa__303505651fl.webp",
  },
  {
    id: 23,
    housing_id: 5,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-starokonstantinov-franka-ulitsa__303505652fl.webp",
  },
  {
    id: 24,
    housing_id: 5,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-starokonstantinov-franka-ulitsa__303505653fl.webp",
  },
  {
    id: 25,
    housing_id: 5,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-starokonstantinov-franka-ulitsa__303505654fl.webp",
  },
  {
    id: 26,
    housing_id: 6,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-starokonstantinov-starokonstantinov-sofievskaya-ulitsa__298090316fx.jpg",
  },
  {
    id: 27,
    housing_id: 6,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-starokonstantinov-starokonstantinov-sofievskaya-ulitsa__298090315xg.webp",
  },
  {
    id: 28,
    housing_id: 6,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-starokonstantinov-starokonstantinov-sofievskaya-ulitsa__301014665xg.webp",
  },
  {
    id: 29,
    housing_id: 6,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-starokonstantinov-starokonstantinov-sofievskaya-ulitsa__301014667xg.webp",
  },
  {
    id: 30,
    housing_id: 6,
    url: "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-starokonstantinov-starokonstantinov-sofievskaya-ulitsa__298090357xg.webp",
  },
];

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
