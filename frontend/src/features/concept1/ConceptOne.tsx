import { useMemo } from 'react'
import {
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import GoQrSvg from '~/assets/svgs/sample-go.svg'
import { fmtTime } from '~/common/util/humanReadable'
import { useParamsLocation } from '~/hooks/useParamsLocation'

interface WaitTime {
  label: string
  fullName: string
  wait: number
}

const waits: WaitTime[] = [
  { label: 'AH', fullName: 'Alexandra Hospital', wait: 100 },
  { label: 'CGH', fullName: 'Changi General Hospital', wait: 200 },
  { label: 'KTPH', fullName: 'Khoo Teck Puat Hospital', wait: 321 },
  { label: 'NTFGH', fullName: 'Ng Teng Fong General Hospital', wait: 600 },
  {
    label: 'NUH(A)',
    fullName: 'National University Hospital (Adult)',
    wait: 123,
  },
  { label: 'SGH', fullName: 'Singapore General Hospital', wait: 1230 },
  { label: 'SKH', fullName: 'Sengkang Hospital', wait: 1320 },
  { label: 'TTSH', fullName: 'Tan Tock Seng Hospital', wait: 120 },
]

export const ConceptOne = (): JSX.Element => {
  const { location } = useParamsLocation()

  const currLocation = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return waits.find(({ label }) => label === location)!
  }, [location])

  return (
    <Flex h="100vh" w="100vw">
      <VStack
        flex={2}
        h="full"
        alignItems="center"
        spacing="72px"
        p={10}
        backgroundColor="neutral.100"
      >
        <Text textStyle="h1" textAlign="center">
          Average Wait Time for Non-Critical Cases
        </Text>

        <VStack spacing={4}>
          <Text color="neutral.800" textStyle="h3" textTransform="capitalize">
            {currLocation.fullName}
          </Text>
          <Text color="neutral.800" textStyle="display-1">
            {fmtTime(currLocation.wait * 60, {
              precision: 'hours',
              verbose: true,
            }).toLocaleUpperCase()}
          </Text>
        </VStack>

        <SimpleGrid columns={4} w="full" spacing={6}>
          {waits
            .filter(({ label }) => label != currLocation.label)
            .map(({ label, wait }) => (
              <GridItem key={label}>
                <VStack spacing={2}>
                  <Text
                    color="neutral.800"
                    textStyle="h3"
                    textTransform="capitalize"
                  >
                    {label}
                  </Text>
                  <Text
                    color="neutral.800"
                    textStyle="display-2"
                    fontWeight="medium"
                  >
                    {fmtTime(wait * 60, { precision: 'hours' })}
                  </Text>
                </VStack>
              </GridItem>
            ))}
        </SimpleGrid>
        <Text color="white">{`https://wait.health.gov.sg`}</Text>
      </VStack>
      <VStack
        flex={1}
        h="full"
        alignItems="center"
        spacing="72px"
        p={10}
        backgroundColor="white"
      >
        <Text textStyle="h1" textAlign="center">
          Check Nearby Open Clinics
        </Text>
        <Image src={GoQrSvg} alt="go-qr" />
        <Text textStyle="h6" textAlign="center" color="gray.500">
          go.gov.sg/clinics-near-ttsh
        </Text>
      </VStack>
    </Flex>
  )
}
