import { Module } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';

@Module({})
export class StockModule {
  constructor(private _: ModulesContainer) {}
}
