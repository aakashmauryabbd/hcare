import type { Principal } from '@dfinity/principal';
export type List = [] | [[string, List]];
export interface Patient {
  'aadharNo' : string,
  'diseases' : List,
  'lastName' : string,
  'firstName' : string,
}
export type PatientId = number;
export interface _SERVICE {
  'create' : (arg_0: Patient) => Promise<PatientId>,
  'delete' : (arg_0: PatientId) => Promise<boolean>,
  'read' : (arg_0: PatientId) => Promise<[] | [Patient]>,
  'update' : (arg_0: PatientId, arg_1: Patient) => Promise<boolean>,
}
