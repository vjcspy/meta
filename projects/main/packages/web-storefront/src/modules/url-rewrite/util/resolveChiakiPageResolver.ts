import { format } from '@web/base';
import { DataObject } from 'chitility/dist/lib/extension/data-object';
import { ExtensionPoint } from 'chitility/dist/lib/extension/extension-point';
import { Registry } from 'chitility/dist/util/registry';

export const resolveChiakiPageResolver = (
  resolveUrlRes: any,
  requestedPathname: string
) => {
  if (resolveUrlRes?.error) {
    console.error(
      'Could not fetch url rewrite data from server',
      resolveUrlRes?.error
    );
  }

  if (
    resolveUrlRes &&
    resolveUrlRes.data &&
    resolveUrlRes.data?.chiakiPageResolver?.type
  ) {
    let configData: any = resolveUrlRes.data?.chiakiPageResolver?.config_data;

    const resolverConfigObject = new DataObject({
      data: resolveUrlRes?.data,
      configData,
    });

    configData = ExtensionPoint.extend(
      'resolveChiakiPageResolver',
      resolverConfigObject
    ).getData('configData');

    if (typeof configData === 'string') {
      try {
        configData = JSON.parse(configData);
      } catch (e) {
        console.error('could not parse chiakiPageResolver config data');
        configData = undefined;
      }
    }
    console.info(format.important('Found chiaki page config'));
    return {
      type: resolveUrlRes.data.chiakiPageResolver.type,
      id: resolveUrlRes.data.chiakiPageResolver.id,
      config_data: configData,
      additional_data: resolveUrlRes.data?.chiakiPageResolver?.additional_data,
      isResolved: true,
      pathname: resolveUrlRes.data?.chiakiPageResolver?.relative_url,
      metadata: resolveUrlRes.data?.chiakiPageResolver?.metadata,
      requestedPathname,
    };
  } else {
    console.info(format.important('Could not resolve router, will render 404'));
    return {
      type: 'STATIC_PAGE',
      id: '404',
      config_data: Registry.getInstance().registry('404_UI_CONFIG') ?? {
        uiId: '404',
      },
      pathname: '404',
      isResolved: true,
      requestedPathname,
    };
  }
};
