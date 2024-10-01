import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyModel.create({ ...createCompanyDto });
  }
}
