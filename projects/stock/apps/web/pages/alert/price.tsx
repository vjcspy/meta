import { Dialog, Transition } from '@headlessui/react';
import { Switch } from '@headlessui/react';
import dynamic from 'next/dynamic';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { IRootState } from '@/store';
import { alertPriceActions } from '@/store/alertPrice';
import { isJSONString } from '@/util/isJSONString';
import { showMessage } from '@/util/showMessage';

const AceEditorComponent = dynamic(() => import('@/components/AceEditor'), {
    loading: () => <p>Loading...</p>,
});

export default function Price() {
    const dispatch = useAppDispatch();
    const [updating, setUpdating] = useState(false);

    // Get alerts
    useEffect(() => {
        // Dispatching the thunk returns a promise
        const promise = dispatch(alertPriceActions.getAlerts());
        return () => {
            // `createAsyncThunk` attaches an `abort()` method to the promise
            promise.abort();
        };
    }, []);

    const [addContactModal, setAddContactModal] = useState<any>(false);

    const [defaultParams] = useState({
        id: null,
        name: '',
        symbol: '',
        conditions: '',
        state: 1,
    });

    const [params, setParams] = useState<any>(
        JSON.parse(JSON.stringify(defaultParams)),
    );

    const changeValue = useCallback(
        (e: any) => {
            const { value, id } = e.target;
            setParams({ ...params, [id]: value });
        },
        [params],
    );

    const [search, setSearch] = useState<any>('');
    const alerts = useSelector((state: IRootState) => state.alertPrice.data);

    const [filteredItems, setFilteredItems] = useState<any>(alerts);

    const searchContact = useCallback(() => {
        setFilteredItems(() => {
            return alerts.filter((item: any) => {
                if (!search) {
                    return true;
                }

                return (
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.symbol.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [alerts, search]);

    useEffect(() => {
        searchContact();
    }, [search, alerts]);

    const saveAlert = useCallback(async () => {
        console.log(params);
        try {
            setUpdating(true);
            if (!isJSONString(params.conditions)) {
                showMessage('Conditions must be a valid JSON', 'error');
                return true;
            }

            if (!params.name) {
                showMessage('Name is required.', 'error');
                return true;
            }

            await dispatch(alertPriceActions.upsertAlert(params));

            showMessage('Alert has been saved successfully.');
            setAddContactModal(false);
            dispatch(alertPriceActions.getAlerts());
        } catch (e) {
            // Empty
        }
        setUpdating(false);
    }, [params]);

    const editAlert = useCallback((alert: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (alert) {
            const json1 = JSON.parse(JSON.stringify(alert));
            setParams(json1);
        }
        setAddContactModal(true);
    }, []);

    const deleteAlert = useCallback(async (alert: any) => {
        if (alert.id) {
            try {
                await dispatch(alertPriceActions.deleteAlert(alert.id));
                showMessage('Alert has been deleted successfully.');
            } catch (e) {
                // EMPTY
            }

            dispatch(alertPriceActions.getAlerts());
        }
    }, []);
    const toggleState = useCallback((alert: any) => {
        editAlert({ ...alert, state: alert.state == 1 ? 0 : 1 });
    }, []);

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Alert Price</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => editAlert()}
                            >
                                <svg
                                    className="ltr:mr-2 rtl:ml-2"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="10"
                                        cy="6"
                                        r="4"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        opacity="0.5"
                                        d="M18 17.5C18 19.9853 18 22 10 22C2 22 2 19.9853 2 17.5C2 15.0147 5.58172 13 10 13C14.4183 13 18 15.0147 18 17.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M21 10H19M19 10H17M19 10L19 8M19 10L19 12"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                Add Alert
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Symbol"
                            className="peer form-input py-2 ltr:pr-11 rtl:pl-11"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="11.5"
                                    cy="11.5"
                                    r="9.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    opacity="0.5"
                                ></circle>
                                <path
                                    d="M18.5 18.5L22 22"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="panel mt-5 overflow-hidden border-0 p-0">
                <div className="table-responsive">
                    <table className="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th className="!text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((contact: any) => {
                                return (
                                    <tr key={contact.id}>
                                        <td>
                                            <div className="flex w-max items-center">
                                                <div>{contact.name}</div>
                                            </div>
                                        </td>
                                        <td>{contact.symbol}</td>
                                        <td>
                                            <div className="flex items-center justify-center gap-4">
                                                {contact.state == 1 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-success"
                                                        onClick={() =>
                                                            toggleState(contact)
                                                        }
                                                    >
                                                        ON
                                                    </button>
                                                )}
                                                {contact.state != 1 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-dark"
                                                        onClick={() =>
                                                            toggleState(contact)
                                                        }
                                                    >
                                                        OFF
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() =>
                                                        editAlert(contact)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        deleteAlert(contact)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog
                    as="div"
                    open={addContactModal}
                    onClose={() => setAddContactModal(false)}
                    className="relative z-50"
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setAddContactModal(false)
                                        }
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line
                                                x1="18"
                                                y1="6"
                                                x2="6"
                                                y2="18"
                                            ></line>
                                            <line
                                                x1="6"
                                                y1="6"
                                                x2="18"
                                                y2="18"
                                            ></line>
                                        </svg>
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                                        {params.id ? 'Edit Alert' : 'Add Alert'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">
                                                    Name
                                                </label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Enter Name"
                                                    className="form-input"
                                                    value={params.name}
                                                    onChange={(e) =>
                                                        changeValue(e)
                                                    }
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="symbol">
                                                    Symbol
                                                </label>
                                                <input
                                                    id="symbol"
                                                    type="symbol"
                                                    placeholder="Enter Symbol"
                                                    className="form-input"
                                                    value={params.symbol}
                                                    onChange={(e) =>
                                                        changeValue(e)
                                                    }
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label>State</label>
                                                <Switch
                                                    checked={params.state == 1}
                                                    onChange={(checked) => {
                                                        setParams({
                                                            ...params,
                                                            state: checked
                                                                ? 1
                                                                : 0,
                                                        });
                                                    }}
                                                    className={`${
                                                        params.state == 1
                                                            ? 'bg-blue-600'
                                                            : 'bg-red-600'
                                                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                                                >
                                                    <span className="sr-only">
                                                        Enable Alert
                                                    </span>
                                                    <span
                                                        className={`${
                                                            params.state == 1
                                                                ? 'translate-x-6'
                                                                : 'translate-x-1'
                                                        } inline-block h-4 w-4 rounded-full bg-white transition`}
                                                    />
                                                </Switch>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="conditions">
                                                    Conditions
                                                </label>
                                                <AceEditorComponent
                                                    value={params.conditions}
                                                    setValue={(
                                                        conditions: any,
                                                    ) => {
                                                        setParams({
                                                            ...params,
                                                            conditions,
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        setAddContactModal(
                                                            false,
                                                        )
                                                    }
                                                    disabled={updating}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                    onClick={saveAlert}
                                                    disabled={updating}
                                                >
                                                    {params.id
                                                        ? 'Update'
                                                        : 'Add'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
