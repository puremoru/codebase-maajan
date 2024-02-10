import useLocalStorage from "@/hooks/useLocalStorage";
import {
  Container,
  Flex,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [player1, setPlayer1] = useLocalStorage("player1", "");
  const [player2, setPlayer2] = useLocalStorage("player2", "");
  const [player3, setPlayer3] = useLocalStorage("player3", "");
  const [player4, setPlayer4] = useLocalStorage("player4", "");

  const [isInitialMounted, setIsInitialMounted] = useState(true);

  const [persistedScores, setPersistedScores] = useLocalStorage(
    "persistedScores",
    ""
  );

  const [scores, setScores] = useState<string[][]>([]);

  const handleScore = (val: string, row: number, col: number) => {
    const scoreRow = scores[row];
    scoreRow[col] = val;

    const idxs = scoreRow.flatMap((s, i) => (s!! ? i : []));
    if (idxs.length === 3) {
      const targetIndex = [0, 1, 2, 3].find((a) => !idxs.includes(a));
      const currentSum = scoreRow.reduce((sum, currentElement) => {
        return sum + Number(currentElement);
      }, 0);
      if (!targetIndex) return;
      scoreRow[targetIndex] = String(0 - currentSum);
    }
    setScores([...scores.slice(0, row), scoreRow]);
  };

  const handleAddRow = () => {
    if (!isInitialMounted) {
      setPersistedScores(scores);
    }
    setScores([...scores, []]);
    setIsInitialMounted(false);
  };

  const handleReset = () => {
    setScores([]);
    setPersistedScores("");
  };

  const sumByColumn = (col: number) => {
    return scores.reduce((sum, currentRow) => {
      return sum + Number(currentRow[col] ?? 0);
    }, 0);
  };

  useEffect(() => {
    if (!isInitialMounted || !persistedScores) return;

    const elements = persistedScores.split(","); // カンマで分割して配列に変換
    const numberOfRows = elements.length / 4; // 行数を計算
    const result = [];

    for (let i = 0; i < numberOfRows; i++) {
      const row = elements.slice(i * 4, (i + 1) * 4); // 4つの要素を切り出して1行分の配列を作成
      result.push(row);
    }
    setScores(result);
  }, [setScores, persistedScores, isInitialMounted]);

  return (
    <Container>
      <Flex justifyContent="center" m="24px">
        <Heading>麻雀スコア表</Heading>
      </Flex>

      <Flex justifyContent="center">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <Input
                    onChange={(e) => setPlayer1(e.target.value)}
                    value={player1}
                    placeholder="1人目"
                    textAlign="center"
                  />
                </Th>
                <Th>
                  <Input
                    onChange={(e) => setPlayer2(e.target.value)}
                    value={player2}
                    placeholder="2人目"
                    textAlign="center"
                  />
                </Th>
                <Th>
                  <Input
                    onChange={(e) => setPlayer3(e.target.value)}
                    value={player3}
                    placeholder="3人目"
                    textAlign="center"
                  />
                </Th>
                <Th>
                  <Input
                    onChange={(e) => setPlayer4(e.target.value)}
                    value={player4}
                    placeholder="4人目"
                    textAlign="center"
                  />
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {scores.map((score, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      onChange={(e) => {
                        setTimeout(() => {
                          handleScore(e.target.value, index, 0);
                        }, 500);
                      }}
                      value={score[0]}
                      textAlign="center"
                    />
                  </Td>
                  <Td>
                    <Input
                      onChange={(e) => {
                        setTimeout(() => {
                          handleScore(e.target.value, index, 1);
                        }, 500);
                      }}
                      value={score[1]}
                      textAlign="center"
                    />
                  </Td>
                  <Td>
                    <Input
                      onChange={(e) => {
                        setTimeout(() => {
                          handleScore(e.target.value, index, 2);
                        }, 500);
                      }}
                      value={score[2]}
                      textAlign="center"
                    />
                  </Td>
                  <Td>
                    <Input
                      onChange={(e) => {
                        setTimeout(() => {
                          handleScore(e.target.value, index, 3);
                        }, 500);
                      }}
                      value={score[3]}
                      textAlign="center"
                    />
                  </Td>
                </Tr>
              ))}
              <Tr>
                <Td textAlign="center">{sumByColumn(0)}</Td>
                <Td textAlign="center">{sumByColumn(1)}</Td>
                <Td textAlign="center">{sumByColumn(2)}</Td>
                <Td textAlign="center">{sumByColumn(3)}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Flex>
            <Button onClick={() => handleAddRow()} mx="4px">
              行を追加する
            </Button>
            <Button onClick={() => handleReset()} mx="4px">
              リセット
            </Button>
          </Flex>
        </TableContainer>
      </Flex>
    </Container>
  );
};

export default Home;
