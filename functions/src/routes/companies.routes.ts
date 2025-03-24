import { Router } from 'express';
import asyncHeadler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { CompaniesController } from '../controllers/companies.controller.js';
import { newCompanySchema, updateCompanySchema } from '../models/company.model.js';


export const companyRoutes = Router();

companyRoutes.get("/companies", asyncHeadler(CompaniesController.getAll));
companyRoutes.get("/companies/:id", asyncHeadler(CompaniesController.getById));
companyRoutes.post("/companies", celebrate({[Segments.BODY]: newCompanySchema}), asyncHeadler(CompaniesController.create));
companyRoutes.put("/companies/:id", celebrate({[Segments.BODY]: updateCompanySchema}), asyncHeadler(CompaniesController.update));


