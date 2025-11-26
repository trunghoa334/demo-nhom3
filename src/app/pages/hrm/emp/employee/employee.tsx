import { Fragment } from 'react/jsx-runtime'
import styles from './employee.module.scss'
import classNames from 'classnames/bind'
import Table from '~/app/components/table-component'
import { useMutation, useQuery } from '@tanstack/react-query'
import { EmployeeType } from '~/app/types/employee/response/employee.type'
import { TANSTACK_KEY } from '~/app/configs/tanstack-key.config'
import { employeeQueryApi } from '~/app/apis/employee/query/employee.query.api'
import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '~/app/configs/routes.config'
import ModalDelete from '~/app/components/modal-delete-component'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useToastMessageAsync } from '~/app/hooks/use-toast-message-async'
import { formatDateTimestamp } from '~/app/utils/string.util'
import Badge from '~/app/components/badge-component'
import { useLang } from '~/app/hooks/use-lang'
import { CONFIG_LANG_KEY } from '~/app/configs/lang-key.config'
import Image from '~/app/components/image-component'

import useDebounce from '~/app/hooks/useDebounce'
import { GetAllEmployeeRequestType } from '~/app/types/employee/request/employee.type'
import { ApiQueryPaginationResponseType } from '~/app/types/utils/api.type'
import ModalViewEmployee from '~/app/pages/hrm/emp/employee/_components/modal-view-employee'
import { useStorePopup } from '~/app/shared/popup.shared'
import { employeeCommandApi } from '~/app/apis/employee/command/employee.command.api'
import useAuthStore from '~/app/shared/auth.shared'

const cx = classNames.bind(styles)
export default function Employee() {
    const { getLangKey, isLoadingLang, language } = useLang()
    const navigate = useNavigate()
    const [isModalDelete, setIsModalDelete] = useState(false)
    const [employeeId, setEmployeeId] = useState(0)
    const { messageSuccess } = useToastMessageAsync()
    const [isModalView, setIsModalView] = useState(false)
    const { profileEmployee } = useAuthStore()
    const { openModal, closeModal } = useStorePopup()

    const mutationResetPassword = useMutation({
        mutationFn: (id: number) => employeeCommandApi.resetPassword(id),
        onSuccess: () => {
            messageSuccess(getLangKey(CONFIG_LANG_KEY.ERP365_RESET_PASS_SUCCESSFULLY))
        },
        onSettled: () => {
            closeModal()
        }
    })

    // State cho tìm kiếm và lọc
    const [keyword, setKeyword] = useState('')
    const [searchType, setSearchType] = useState<'name' | 'code'>('name') // Loại tìm kiếm: theo tên hoặc mã NV
    const [sortType, setSortType] = useState<'name' | 'date'>('name') // Loại sắp xếp: theo tên hoặc ngày sinh
    
    const debouncedKeyword = useDebounce(keyword, 500) // Giảm thời gian debounce để phản hồi nhanh hơn

    const [paramsEmployee, setParamsEmployee] = useState<GetAllEmployeeRequestType>({
        isActived: 1,
        pageNumber: 1,
pageSize: 500,
        empName: '',
        empCode: '',
        isDescending: false,
        sortBy: 'empFirstName', // Mặc định sắp xếp theo tên
        companyId: null
    })

    // Cập nhật paramsEmployee khi có thay đổi
    useEffect(() => {
        if (profileEmployee?.companyId) {
            setParamsEmployee((prev) => ({
                ...prev,
                companyId: profileEmployee.companyId,
                empName: searchType === 'name' ? debouncedKeyword : '',
                empCode: searchType === 'code' ? debouncedKeyword : '',
                sortBy: sortType === 'name' ? 'empFirstName' : 'empBirthday'
            }))
        }
    }, [profileEmployee?.companyId, debouncedKeyword, searchType, sortType])

    const { data, isLoading, refetch } = useQuery({
        queryKey: [TANSTACK_KEY.EMPLOYEE_PAGINATION_ALL, paramsEmployee],
        queryFn: () => employeeQueryApi.getAllEmployee(paramsEmployee),
        enabled: !!profileEmployee?.companyId && paramsEmployee.companyId !== null
    })

    const employeeData = data as ApiQueryPaginationResponseType<EmployeeType[]>

    // Refetch data khi params thay đổi
    useEffect(() => {
        if (profileEmployee?.companyId) {
            refetch()
        }
    }, [paramsEmployee, profileEmployee?.companyId])

    const columns: ColumnDef<EmployeeType>[] = useMemo(
        () => [
            {
                id: 'select',
                size: 40,
                header: ({ table }) => {
                    return (
                        <input
                            type='checkbox'
                            checked={table.getIsAllRowsSelected()}
                            ref={(input) => {
                                if (input) input.indeterminate = table.getIsSomeRowsSelected()
                            }}
                            onChange={table.getToggleAllRowsSelectedHandler()}
                        />
                    )
                },
                cell: ({ row }) => {
                    return <input type='checkbox' checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
                }
            },
            {
                accessorKey: 'stt',
                size: 50,
                header: getLangKey(CONFIG_LANG_KEY.ERP365_NO_NUMBER),
                cell: ({ row }) => {
                    const index = row.index
                    return <span className={cx('columnIdDetail', 'rowId')}>{index + 1}</span>
                }
            },
            {
                accessorKey: 'id',
                header: 'Id',
                cell: ({ row }) => {
                    const { id } = row.original
                    return <span className={cx('columnIdDetail', 'rowId')}>{id}</span>
                }
            },
            {
                accessorKey: 'empFirstName',
                header: getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_TABLE_HEADER_FULLNAME),
cell: ({ row }) => {
                    const { empFirstName, empLastName, empImage, empCode } = row.original
                    return (
                        <div className={cx('imageBox')}>
                            <Image className={cx('image')} src={empImage} alt={empLastName} />
                            <div className={cx('info')}>
                                <span>
                                    {empFirstName} {empLastName}
                                </span>
                                <span className={cx('infoEmpCode')}>{empCode}</span>
                            </div>
                        </div>
                    )
                }
            },

            {
                accessorKey: 'empBirthday',
                header: getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_TABLE_HEADER_DATE_OF_BIRTH),
                cell: ({ row }) => {
                    const { empBirthday } = row.original
                    return empBirthday ? (
                        <span>{formatDateTimestamp(empBirthday).toLocaleDateString('vi-VN')}</span>
                    ) : (
                        getLangKey(CONFIG_LANG_KEY.ERP365_EMPTY)
                    )
                }
            },
            {
                accessorKey: 'empGender',
                header: getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_TABLE_HEADER_GENDER),
                enableSorting: false,
                cell: ({ row }) => {
                    const { empGender } = row.original
                    return (
                        <span>
                            {!empGender ? getLangKey(CONFIG_LANG_KEY.ERP365_MALE) : getLangKey(CONFIG_LANG_KEY.ERP365_FEMALE)}
                        </span>
                    )
                }
            },
            {
                accessorKey: 'empRoleName',
                header: getLangKey(CONFIG_LANG_KEY.ERP365_POSITION)
            },
            {
                accessorKey: 'empTel',
                header: getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_TABLE_HEADER_TEL)
            },
            {
                header: getLangKey(CONFIG_LANG_KEY.ERP365_ACTIVED),
                accessorKey: 'isActived',
                enableSorting: false,
                cell: ({ row }) => {
                    const { isActived } = row.original
                    return isActived ? (
                        <Badge soft={true} color='success'>
                            {getLangKey(CONFIG_LANG_KEY.ERP365_INACTIVED)}
                        </Badge>
                    ) : (
                        <Badge soft={true} color='warning'>
                            {getLangKey(CONFIG_LANG_KEY.ERP365_UNACTIVED)}
                        </Badge>
                    )
                }
            },
            {
                header: getLangKey(CONFIG_LANG_KEY.ERP365_ACTION),
                accessorKey: '',
                enableSorting: false,
                cell: ({ row }) => {
const { id, isActived } = row.original
                    return (
                        <div className={cx('actions')}>
                            <i className='ri-lock-password-fill iconBlue' onClick={() => toggleResetPassword(id)}></i>
                            <span className='ri-eye-fill iconBlue' onClick={() => toggleModalView(id)}></span>
                            <span className='ri-pencil-fill iconBlue' onClick={() => navigate(`/employee/update/${id}`)}></span>
                            <span
                                className={`ri-delete-bin-6-fill ${isActived ? 'iconDanger' : 'iconSecondary'}`}
                                onClick={() => isActived && toggleModalDelete(id)}
                            ></span>
                        </div>
                    )
                }
            }
        ],
        [isLoadingLang, language]
    )

    const toggleResetPassword = useCallback((id: number) => {
        const title = `Reset mật khẩu`
        const message = `Bạn có chắc chắn yêu cầu đặt lại mật khẩu cho nhân viên này?`
        openModal(title, message, () => {
            mutationResetPassword.mutate(id)
        })
    }, [])

    const toggleModalView = useCallback(
        (id?: number) => {
            if (id) {
                setEmployeeId(id)
            }
            setIsModalView(!isModalView)
        },
        [isModalView]
    )

    const toggleModalDelete = useCallback((id?: number) => {
        if (id) {
            setEmployeeId(id)
        }
        setIsModalDelete(!isModalDelete)
    }, [])

    // Xử lý thay đổi loại tìm kiếm
    const handleSearchTypeChange = useCallback((type: 'name' | 'code') => {
        setSearchType(type)
        setKeyword('') // Reset keyword khi thay đổi loại tìm kiếm
    }, [])

    // Xử lý sắp xếp
    const handleChangeSort = useCallback((key: string) => {
        if (key === 'name_asc') {
            setParamsEmployee((prevState) => ({ 
                ...prevState, 
                isDescending: false,
                sortBy: 'empFirstName'
            }))
            setSortType('name')
        } else if (key === 'name_desc') {
            setParamsEmployee((prevState) => ({ 
                ...prevState, 
                isDescending: true,
                sortBy: 'empFirstName'
            }))
            setSortType('name')
        } else if (key === 'date_asc') {
            setParamsEmployee((prevState) => ({ 
                ...prevState, 
                isDescending: false,
                sortBy: 'empBirthday'
            }))
            setSortType('date')
        } else if (key === 'date_desc') {
            setParamsEmployee((prevState) => ({ 
                ...prevState, 
                isDescending: true,
                sortBy: 'empBirthday'
            }))
            setSortType('date')
        }
    }, [])

    const handleChangeActive = useCallback((key: string) => {
        if (key === 'all') {
setParamsEmployee((prevState) => ({ ...prevState, isActived: null }))
        } else if (key === 'active') {
            setParamsEmployee((prevState) => ({ ...prevState, isActived: 1 }))
        } else {
            setParamsEmployee((prevState) => ({ ...prevState, isActived: 0 }))
        }
    }, [])

    // Options cho dropdown tìm kiếm
    const searchTypeOptions = useMemo(() => [
        {
            key: 'name',
            label: (
                <span className={cx('dropdownItem')}>
                    <i className='ri-user-search-line'></i>
                    {getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_SEARCH_BY_NAME)}
                </span>
            )
        },
        {
            key: 'code',
            label: (
                <span className={cx('dropdownItem')}>
                    <i className='ri-barcode-line'></i>
                    {getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_SEARCH_BY_CODE)}
                </span>
            )
        }
    ], [isLoadingLang])

    // Options cho dropdown sắp xếp
    const sortOptions = useMemo(() => [
        {
            key: 'name_asc',
            label: (
                <span className={cx('dropdownItem')}>
                    <i className='ri-sort-alphabet-asc'></i>
                    {getLangKey(CONFIG_LANG_KEY.ERP365_SORT_BY)}: {getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_SORT_NAME_ASC)}
                </span>
            )
        },
        {
            key: 'name_desc',
            label: (
                <span className={cx('dropdownItem')}>
                    <i className='ri-sort-alphabet-desc'></i>
                    {getLangKey(CONFIG_LANG_KEY.ERP365_SORT_BY)}: {getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_SORT_NAME_DESC)}
                </span>
            )
        },
        {
            key: 'date_asc',
            label: (
                <span className={cx('dropdownItem')}>
                    <i className='ri-sort-number-asc'></i>
                    {getLangKey(CONFIG_LANG_KEY.ERP365_SORT_BY)}: {getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_SORT_DATE_ASC)}
                </span>
            )
        },
        {
            key: 'date_desc',
            label: (
                <span className={cx('dropdownItem')}>
                    <i className='ri-sort-number-desc'></i>
                    {getLangKey(CONFIG_LANG_KEY.ERP365_SORT_BY)}: {getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_SORT_DATE_DESC)}
                </span>
            )
        }
    ], [isLoadingLang])

    // Get current search type label
    const currentSearchTypeLabel = useMemo(() => {
        return searchTypeOptions.find(option => option.key === searchType)?.label
    }, [searchType, searchTypeOptions])

    // Get current sort label
    const currentSortLabel = useMemo(() => {
        const currentSortKey = `${sortType}_${paramsEmployee.isDescending ? 'desc' : 'asc'}`
        return sortOptions.find(option => option.key === currentSortKey)?.label
}, [sortType, paramsEmployee.isDescending, sortOptions])

    return (
        <Fragment>
            <div className='container-content'>
                <Table
                    loading={isLoading || isLoadingLang}
                    columns={columns}
                    data={employeeData?.items || []}
                    pageNumber={employeeData?.pageNumber}
                    pageSize={employeeData?.pageSize}
                    totalPages={employeeData?.totalPages}
                    valueSearch={keyword}
                    onChangeSearch={(value) => setKeyword(value)}
                    onPaginationChange={(pagination) => {
                        setParamsEmployee((prevState) => ({ ...prevState, ...pagination }))
                    }}
                    // Thêm dropdown chọn loại tìm kiếm
                    searchType={{
                        options: searchTypeOptions,
                        value: searchType,
                        onChange: handleSearchTypeChange,
                        currentLabel: currentSearchTypeLabel
                    }}
                    optionActive={{
                        key: 'all',
                        onChange: handleChangeActive
                    }}
                    optionsFilter={[
                        {
                            key: 'sort',
                            label: currentSortLabel || sortOptions[0].label,
                            option: sortOptions,
                            onChange: handleChangeSort
                        }
                    ]}
                    onAdd={() => navigate(APP_ROUTES.EMPLOYEE_ADD)}
                    title={getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_TITLE)}
                    titleAdd={getLangKey(CONFIG_LANG_KEY.PAGE_EMPLOYEE_ADD_EMPLOYEE)}
                    defaultRowsLoading={2}
                />
            </div>
            <ModalViewEmployee id={employeeId} modal={isModalView} toggle={toggleModalView} />
            <ModalDelete
                recordId={getLangKey(CONFIG_LANG_KEY.ERP365_EMPLOYEE)}
                show={isModalDelete}
                onCloseClick={toggleModalDelete}
                onDeleteClick={() => {
                    setIsModalDelete(false)
                    messageSuccess(getLangKey(CONFIG_LANG_KEY.ERP365_DELETE_SUCCESSFULLY))
                }}
            />
        </Fragment>
    )
}