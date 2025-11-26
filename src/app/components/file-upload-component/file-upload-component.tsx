import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './file-upload-component.module.scss'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'
import Button from '~/app/components/button/button-component'
import { getFileSizeInMB } from '~/app/utils/file.util'

const cx = classNames.bind(styles)
export default function FileUpload() {
    const [files, setFiles] = useState<File[]>([])
    const { t } = useTranslation()

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prev) => [...prev, ...acceptedFiles])
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const removeFile = (fileName: string) => {
        setFiles((current) => current.filter((file) => file.name !== fileName))
    }
    return (
        <div className={cx('container')}>
            <div className={cx('fileMain')} {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={cx('fileContent')}>
                    <i className={cx('ri-upload-cloud-fill', 'fileContentIcon')}></i>
                    <h4>{t('Drop files here or click to upload')}</h4>
                </div>
            </div>
            <div className={cx('fileActived')}>
                {files.map((file) => (
                    <div key={file.name} className={cx('fileItem')}>
                        <div className={cx('title')}>
                            <i className={cx('ri-file-text-fill', 'titleIcon')}></i>
                            <div className={cx('titleFile')}>
                                <span className={cx('titleFileName')}>{file.name}</span>
                                <span className={cx('titleFileSize')}>{getFileSizeInMB(file)} MB</span>
                            </div>
                        </div>
                        <Button onClick={() => removeFile(file.name)} color='danger' size='lg'>
                            {t('Delete')}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
