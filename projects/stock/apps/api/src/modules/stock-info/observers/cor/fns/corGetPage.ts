import { prisma } from '@modules/core/util/prisma';
import { CorEntity } from '@modules/stock-info/model/CorEntity';
import { retrieveCor } from '@modules/stock-info/requests/vietstock/corporate';
import type { VietStockCredentialsInterface } from '@modules/stock-info/requests/vietstock/credentials';
import { VietStockCrds } from '@modules/stock-info/requests/vietstock/credentials';

export const corGetPageFn = async (
  page: number,
  vsCreds?: VietStockCredentialsInterface,
) => {
  if (typeof vsCreds === 'undefined') {
    vsCreds = await VietStockCrds.retrieveCredentials();
  }
  try {
    const _data = await retrieveCor(page, vsCreds);
    const _aData = JSON.parse(_data);
    if (Array.isArray(_aData) && _aData.length > 0) {
      for (let i = 0; i < _aData.length; i++) {
        const data = CorEntity.convertToCorObject(_aData[i]);
        await prisma.cor_entity.upsert({
          where: { code: data['code'] },
          create: data,
          update: data,
        });
      }

      return {
        numOfRecords: _aData.length,
      };
    }
    return {
      affectedRows: 0,
      numOfRecords: 0,
    };
  } catch (e) {
    console.log('error', e);

    return null;
  }
};
