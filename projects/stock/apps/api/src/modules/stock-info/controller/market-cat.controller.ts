import { OkResponse } from '@modules/core/model/ok-response';
import { FlagRepo } from '@modules/core/repo/flag.repo';
import { MarketCategory } from '@modules/stock-info/controller/market-cat.dto';
import { MarketCatValue } from '@modules/stock-info/values/market-cat.value';
import { XLogger } from '@nest/base';
import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { filter } from 'lodash';

@Controller('market-cat')
export class MarketCatController {
  private readonly logger = new XLogger(MarketCatController.name);

  constructor(private flagRepo: FlagRepo) {}

  @Get('list')
  async getListCat() {
    const data = await this.flagRepo.findByKey(
      MarketCatValue.MARKET_CAT_FLAG_KEY,
    );
    let catList = [
      {
        key: MarketCatValue.DEFAULT_MARKET_CAT_KEY,
        name: 'Default Market Category',
        symbols: [],
      },
    ];
    if (!data) {
      await this.flagRepo.create(
        MarketCatValue.MARKET_CAT_FLAG_KEY,
        JSON.stringify(catList),
      );
    } else {
      try {
        catList = JSON.parse(data.value);
      } catch (e) {
        this.logger.error('Error when parse cat data', e);
        throw new InternalServerErrorException();
      }
    }

    return new OkResponse(undefined, catList);
  }

  @Post('save')
  async saveCategory(@Body() rq: MarketCategory) {
    const data = await this.flagRepo.findByKey(
      MarketCatValue.MARKET_CAT_FLAG_KEY,
    );

    let catList = [
      {
        key: MarketCatValue.DEFAULT_MARKET_CAT_KEY,
        name: 'Default Market Category',
        symbols: [],
      },
    ];
    if (!data) {
      await this.flagRepo.create(
        MarketCatValue.MARKET_CAT_FLAG_KEY,
        JSON.stringify(catList),
      );
    } else {
      try {
        catList = JSON.parse(data.value);
        catList = filter(catList, (c) => c.key !== rq.key);
        catList.push({
          key: rq.key,
          name: rq.name ?? 'No Name',
          symbols: rq.symbols ?? [],
        });

        await this.flagRepo.update(
          MarketCatValue.MARKET_CAT_FLAG_KEY,
          JSON.stringify(catList),
        );
      } catch (e) {
        this.logger.error('Error when parse cat data', e);
        throw new InternalServerErrorException();
      }
    }

    return new OkResponse();
  }

  @Delete('delete')
  async deleteCat(@Body() rq: MarketCategory) {
    const data = await this.flagRepo.findByKey(
      MarketCatValue.MARKET_CAT_FLAG_KEY,
    );

    if (!data) {
      throw new NotFoundException();
    } else {
      try {
        let catList = JSON.parse(data.value);
        catList = filter(catList, (c) => c.key !== rq.key);

        await this.flagRepo.update(
          MarketCatValue.MARKET_CAT_FLAG_KEY,
          JSON.stringify(catList),
        );
      } catch (e) {
        this.logger.error('Error when parse cat data', e);
        throw new InternalServerErrorException();
      }
    }

    return new OkResponse();
  }
}
