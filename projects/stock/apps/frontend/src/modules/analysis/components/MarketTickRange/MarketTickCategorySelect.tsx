import { SettingOutlined } from '@ant-design/icons';
import Symbol from '@modules/analysis/components/Symbol';
import withMarketSymbolCategories from '@modules/analysis/hoc/withMarketSymbolCategories';
import { CommonValue } from '@modules/analysis/value/common.value';
import { message } from '@modules/app/util/message';
import { MARKET_TICK_SELECTED_CATEGORY_KEY } from '@src/value/analysis.value';
import { combineHOC } from '@web/ui-extension/dist';
import { Button, Input, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { find, map } from 'lodash-es';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface DataType {
  key: string;
  name: string;
  symbols: string;
}

const CategoryTable = React.memo(
  (props: {
    categories: any[];
    selectCat: (cat: any) => void;
    editCat: (cat: any) => void;
  }) => {
    const columns = useMemo(() => {
      const columns: ColumnsType<DataType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          defaultSortOrder: 'ascend',
          render: (text, record) => (
            <a
              onClick={() => {
                props.selectCat(record);
              }}
            >{`${text} (${record.symbols.length} symbols)`}</a>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          render: (_, record) => {
            if (record.key == CommonValue.DEFAULT_MARKET_SYMBOL_CAT) {
              return <></>;
            }

            return (
              <Space size="middle">
                <a
                  onClick={() => {
                    props.editCat(record);
                  }}
                >
                  Edit
                </a>
                <a className="text-danger">Delete</a>
              </Space>
            );
          },
        },
      ];

      return columns;
    }, []);

    const data = useMemo(() => {
      return map(props.categories, (c: any) => {
        return { ...c };
      });
    }, [props.categories]);
    return (
      <Table
        pagination={false}
        scroll={{ y: 300 }}
        size="small"
        columns={columns}
        dataSource={data}
      />
    );
  },
);

export default combineHOC(withMarketSymbolCategories)((props) => {
  const [catName, setCatName] = useState(
    props?.state?.selectedMarketCat?.name ?? 'Please select',
  );

  useEffect(() => {
    if (props?.state?.selectedMarketCat) {
      setCatName(props?.state?.selectedMarketCat?.name);
    }
  }, [props?.state?.selectedMarketCat]);

  /*SELECT DEFAULT CATEGORY*/
  useEffect(() => {
    if (
      Array.isArray(props.state?.marketCategories) &&
      !props?.state?.selectedMarketCat
    ) {
      const defaultCatKey =
        localStorage.getItem(MARKET_TICK_SELECTED_CATEGORY_KEY) ??
        CommonValue.DEFAULT_MARKET_SYMBOL_CAT;

      const defaultCat = find(
        props.state?.marketCategories,
        (c) => c?.key === defaultCatKey,
      );

      if (defaultCat) {
        message().success({
          content: `Select category: ${defaultCat.name}`,
        });
        props?.actions?.selectMarketCat(defaultCat);
      }
    }
  }, [props.state?.marketCategories, props?.state?.selectedMarketCat]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modelCreateOpen, setModalCreateOpen] = useState<boolean>(false);
  const [modalFake1Open, setModalFake1Open] = useState<boolean>(false);

  const [editCat, setEditCat] = useState<any>({ name: '' });

  const saveEditCat = useCallback(() => {
    if (editCat?.name?.length > 0) {
      const key = window?.crypto?.randomUUID();
      const newCat = {
        key: editCat?.key ?? key,
        name: editCat?.name,
        symbols: editCat?.symbols ?? [],
      };
      props.actions.saveMarketCat(newCat);
      setModalCreateOpen(false);
      setModalOpen(false);
    }
  }, [editCat]);

  if (!props?.state?.marketCategories) {
    return (
      <div>
        <label>Select Category</label>
        <Button style={{ width: '100%', height: '2.25rem' }} disabled>
          Not found Category data
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <label>{`Category (${props?.state?.selectedMarketCat?.symbols?.length} symbols)`}</label>
        <Button
          size="middle"
          style={{ width: '100%', height: '2.25rem' }}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <Space>
            {catName}
            {/*@ts-ignore*/}
            <SettingOutlined />
          </Space>
        </Button>
      </div>
      <Modal
        title="Select Market Category"
        centered
        width="65rem"
        maskClosable={false}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={(_, { CancelBtn }) => (
          <>
            <Button
              onClick={() => {
                setModalOpen(false);
                setEditCat({
                  name: '',
                });
                setModalCreateOpen(false);
                setModalFake1Open(true);
              }}
            >
              Fake 1 Symbol
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
                setEditCat({
                  name: '',
                });
                setModalCreateOpen(true);
              }}
            >
              Create new
            </Button>
            <CancelBtn />
          </>
        )}
      >
        <CategoryTable
          categories={props.state.marketCategories}
          selectCat={(cat: any) => {
            props?.actions?.selectMarketCat(cat);
            setModalOpen(false);
          }}
          editCat={(cat: any) => {
            setEditCat(cat);
            setModalCreateOpen(true);
          }}
        />
      </Modal>

      <Modal
        title={`${
          editCat?.key ? 'Update Market Category' : 'Create Market Category'
        }`}
        centered
        maskClosable={false}
        open={modelCreateOpen}
        onCancel={() => setModalCreateOpen(false)}
        onOk={saveEditCat}
      >
        <form>
          <div>
            <Input
              count={{
                show: true,
                max: 40,
              }}
              size="large"
              placeholder="Category name"
              value={editCat?.name}
              onChange={(e) => {
                setEditCat({ ...editCat, name: e?.target?.value });
              }}
              required
            />
          </div>
        </form>
      </Modal>

      <Modal
        title={`Fake 1 Symbol Category`}
        centered
        maskClosable={false}
        open={modalFake1Open}
        onCancel={() => setModalFake1Open(false)}
        onOk={() => {
          props.actions.selectFakeMarketCatWithCurrentSymbol();
          setModalFake1Open(false);
        }}
      >
        <Symbol />
      </Modal>
    </div>
  );
});
