interface RetrospectMemoProps {
  memo: string
}

export default function RetrospectMemo({
  memo,
}: RetrospectMemoProps) {
  return (
    <section
      className="
        border-t-[8px]
        border-grey-50
        bg-white
        px-4
        pb-8
        pt-4
      "
    >
      <h2 className="text-headline font-semibold text-black">
        메모
      </h2>

      <p className="mt-[14px] whitespace-pre-wrap text-subheadline font-normal text-grey-800">
        {memo}
      </p>
    </section>
  )
}