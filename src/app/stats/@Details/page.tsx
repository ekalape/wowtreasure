

export default async function page({ searchParams }: { searchParams: Promise<{ from: string, to: string }> }) {
    const { from, to } = await searchParams;

    return (
        <div>page Details + {from} + {to}</div>
    )
}
