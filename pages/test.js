const Test = ({ pk }) => {
  return <div>pk: {pk}</div>
}

export const getServerSideProps = () => {
  return {
    props: {
      pk: process.env.TRANSCRIBE_ACCESS_ID
    }
  }
}

export default Test
