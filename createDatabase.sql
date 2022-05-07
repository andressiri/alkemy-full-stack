CREATE DATABASE "andres-siri-alkemy-test";

\c "andres-siri-alkemy-test"

CREATE TABLE people (
  user_uuid UUID PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  verified BOOLEAN,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP
);

CREATE TABLE records (
  record_uuid UUID PRIMARY KEY,
  concept VARCHAR(50) NOT NULL,
  amount REAL NOT NULL,
  operation_date DATE NOT NULL,
  operation_type VARCHAR(7) NOT NULL,
  category VARCHAR(50),
  user_uuid UUID NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  CONSTRAINT user_foreign_key
    FOREIGN KEY(user_uuid)
      REFERENCES people(user_uuid),
  CONSTRAINT operation_type_valid_values
    CHECK(operation_type = 'Income' OR operation_type = 'Outcome')
);

INSERT INTO people (user_uuid, name, email, password, verified, "createdAt", "updatedAt") VALUES ('dbe25e84-738c-4f98-b945-ee9cbe925011', 'Fake User', 'user@fake.test', '$2a$10$P2240Y0nqqyfkt6lRJjJ0eZDQBYRO1zv3w2ujkN46vQk9aQ/2qW2S', true, '2022-05-06T15:38:09.157Z', '2022-05-06T15:38:09.157Z');

INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('3eb684d5-e02b-4741-8adc-0ca39f6610c5', 'Accounting expenditures', '307.38', '2022-04-30', 'Outcome', 'Personal', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.700Z', '2022-05-06T15:38:09.700Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('bc2a47c6-744a-460d-8e8c-a070ab419bb0', 'Material costs', '405.15', '2022-04-30', 'Income', 'Office', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.701Z', '2022-05-06T15:38:09.701Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('a1e8661b-798b-4f87-a65e-b3d38b5c7a08', 'Rent', '330', '2022-04-30', 'Outcome', 'Office', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.702Z', '2022-05-06T15:38:09.702Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('64874ab7-f503-434a-862f-0146cdd5a5fb', 'Sales', '1317.04', '2022-04-30', 'Income', '', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.703Z', '2022-05-06T15:38:09.703Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('626e4714-7607-4eab-8eea-1237e8acdc11', 'Professional fees', '317.03', '2022-04-30', 'Income', 'Personal', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.704Z', '2022-05-06T15:38:09.704Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('521ac89f-7987-4fc6-837f-8c858d635910', 'Advertising', '617.99', '2022-04-30', 'Outcome', '', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.705Z', '2022-05-06T15:38:09.705Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('f1b10db2-98b8-4abb-802a-85f91e033a62', 'Taxes', '275.95', '2022-04-30', 'Outcome', '', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.706Z', '2022-05-06T15:38:09.706Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('a7077ce0-b467-47f9-9975-1509b8a36ae3', 'Sales', '1479.54', '2022-04-30', 'Income', '', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.707Z', '2022-05-06T15:38:09.707Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('fda96fcb-f2be-4569-b3c6-f571cbe03001', 'Insurance', '230', '2022-04-30', 'Outcome', 'Office', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.708Z', '2022-05-06T15:38:09.708Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('ca0d123b-5d02-4110-bd70-973282978640', 'Travel expenses', '180.17', '2022-04-30', 'Outcome', 'Personal', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.709Z', '2022-05-06T15:38:09.709Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('39063f6b-75a1-4442-beeb-8929499bea94', 'Repair', '297.34', '2022-04-30', 'Income', 'Office', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.710Z', '2022-05-06T15:38:09.710Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('c3e1cd9c-73a2-4d0b-b569-8b0a7abe513d', 'Supplies', '705.02', '2022-04-30', 'Outcome', 'Office', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.711Z', '2022-05-06T15:38:09.711Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('a6310a84-66b4-4066-85c6-3d1d0d8e4222', 'Legal Fees', '534.17', '2022-04-30', 'Outcome', 'Personal', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.712Z', '2022-05-06T15:38:09.712Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('dae77e7a-f4dc-4318-a969-34c828503af8', 'Supplies', '701.45', '2022-04-30', 'Outcome', 'Office', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.713Z', '2022-05-06T15:38:09.713Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('82a33a2c-a0f8-44db-9619-065ef4dbb289', 'Material costs', '405.15', '2022-04-30', 'Income', '', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.714Z', '2022-05-06T15:38:09.714Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('9a581d5d-471a-4414-a4e3-75531de4b249', 'Services provided', '1935.84', '2022-04-30', 'Income', 'Personal', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.715Z', '2022-05-06T15:38:09.715Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('c9e9af0e-1900-4fed-af67-5da284a25738', 'Rent', '330', '2022-04-30', 'Outcome', 'Office', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.716Z', '2022-05-06T15:38:09.716Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('84848c5d-6ca4-4ec0-b949-7a073083029e', 'Insurance', '230', '2022-04-30', 'Income', 'Office', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.717Z', '2022-05-06T15:38:09.717Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('4818546c-79d9-4a5d-b567-97b949d205b1', 'Services provided', '1834.71', '2022-04-30', 'Income', 'Personal', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.718Z', '2022-05-06T15:38:09.718Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('e29992c5-0a33-4f23-a0be-8bdb788fd561', 'Advertising', '609.02', '2022-04-30', 'Outcome', '', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.719Z', '2022-05-06T15:38:09.719Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('4c998410-f01f-4758-b544-1ac0cc0c90b8', 'Professional fees', '309.55', '2022-04-30', 'Income', 'Personal', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.720Z', '2022-05-06T15:38:09.720Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('75356adc-49d7-4f23-809c-bf4f1f49259e', 'Services provided', '1649.91', '2022-04-30', 'Income', 'Personal', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.721Z', '2022-05-06T15:38:09.721Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('abefdacc-a48d-41fd-b310-31d25fd39733', 'Accounting expenditures', '307.37', '2022-04-30', 'Income', 'Personal', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.722Z', '2022-05-06T15:38:09.722Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('d326dd52-320d-4fa6-a98f-988ad0e3a3e3', 'Taxes', '495.66', '2022-04-30', 'Outcome', '', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.723Z', '2022-05-06T15:38:09.723Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('96c753a0-3a83-4b8c-82f3-254be98916a5', 'Material costs', '405.15', '2022-04-30', 'Income', '', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.724Z', '2022-05-06T15:38:09.724Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('f444b4d9-10f1-46e4-a434-c69d0aa2d963', 'Travel expenses', '180.17', '2022-04-30', 'Outcome', 'Personal', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.725Z', '2022-05-06T15:38:09.725Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('d2034f1b-5be0-4895-bbd2-cca0ecfc05b3', 'Repair', '704.33', '2022-04-30', 'Income', 'Office', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.726Z', '2022-05-06T15:38:09.726Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('21834756-d5fc-46ff-8243-b34a4799d8a3', 'Rent', '330', '2022-04-30', 'Outcome', 'Office', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.727Z', '2022-05-06T15:38:09.727Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('02759ffb-cf5c-4049-b3f7-1edc71a89587', 'Professional fees', '332.15', '2022-04-30', 'Outcome', 'Personal', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.728Z', '2022-05-06T15:38:09.728Z');
INSERT INTO records (record_uuid, concept, amount, operation_date, operation_type, category, user_uuid, "createdAt", "updatedAt") VALUES ('cad09ebb-6f59-4196-bf83-680c7598769e', 'Sales', '1713.18', '2022-04-30', 'Income', '', 'dbe25e84-738c-4f98-b945-ee9cbe925011', '2022-05-06T15:38:09.729Z', '2022-05-06T15:38:09.729Z');