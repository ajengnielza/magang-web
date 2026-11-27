
import type { components, paths } from "./schema";

type Skema = components["schemas"];

export type Peserta = Skema["Peserta"];
export type Jurnal = Skema["Jurnal"];
export type Lampiran = Skema["Lampiran"];
export type StatusReview = Jurnal["statusReview"];
export type JurnalBaru = Skema["CreateJurnalRequest"];
export type PaginationMeta = Skema["PaginationMeta"];
export type FieldError = Skema["FieldError"];
export type ErrorResponse = Skema["ErrorResponse"];
export type LoginResponse = Skema["LoginResponse"];
export type JurnalResponse = Skema["JurnalResponse"];
export type JurnalListResponse = Skema["JurnalListResponse"];
export type LoginRequest = Skema["LoginRequest"];
export type JurnalSayaResponse =
  paths["/me/jurnal"]["get"]["responses"]["200"]["content"]["application/json"];
export type PesertaResponse = Skema["PesertaResponse"];
export type RefreshResponse = Skema["RefreshResponse"];