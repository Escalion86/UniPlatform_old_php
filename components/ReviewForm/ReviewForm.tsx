import { ReviewFormProps } from './ReviewForm.props'
import styles from './ReviewForm.module.css'
import cn from 'classnames'
import { Button, Input, Rating, Textarea } from '..'
import CloseIcon from './close.svg'
import { useForm, Controller } from 'react-hook-form'
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface'
import axios from 'axios'
import { API } from '../../helpers/api'
import { useState } from 'react'

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>()

  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      )
      if (data.message) {
        setIsSuccess(true)
        reset()
      } else {
        setError('Что-то пошло не так')
      }
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните имя' },
          })}
          placeholder="Имя"
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.name}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' },
          })}
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: { value: true, message: 'Укажите рейтинг' },
            }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Заполните описание' },
          })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={!!errors.description}
        />
        <div className={styles.submit}>
          <Button
            appearance="primary"
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div role="alert" className={cn(styles.panel, styles.success)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div className={styles.successTitle}>
            Спасибо, ваш отзыв будет опубликован после проверки
          </div>
          <button
            aria-label="Закрыть оповещение"
            onClick={() => setIsSuccess(false)}
            className={styles.close}
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div role="alert" className={cn(styles.panel, styles.error)}>
          Что-то пошло не так, попробуйте обновить страницу
          <button
            aria-label="Закрыть оповещение"
            onClick={() => setError(undefined)}
            className={styles.close}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  )
}
