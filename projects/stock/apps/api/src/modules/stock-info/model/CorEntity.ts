import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CorEntity {
  private readonly logger = new Logger(CorEntity.name);

  static convertToCorObject(vsData: any) {
    const logger = new Logger(CorEntity.name);
    let firstTradeDate = null;
    const reTime = new RegExp('(/Date\\()(.*)(\\)/)');
    const _r: any = reTime.exec(vsData.FirstTradeDate);
    if (_r?.length === 4 && !Number.isNaN(_r[2])) {
      firstTradeDate = new Date(parseInt(_r[2]));
    } else {
      logger.log(`Cổ phiếu ${vsData.Code} không có dữ liệu firstTradeDate`);
    }
    return {
      refId: vsData.ID,
      catId: vsData.CatID,
      code: vsData.Code,
      exchange: vsData.Exchange,
      industryName1: vsData.IndustryName1,
      industryName2: vsData.IndustryName2,
      industryName3: vsData.IndustryName3,
      name: vsData.Name,
      totalShares: vsData.TotalShares,
      firstTradeDate,
    };
  }
}
