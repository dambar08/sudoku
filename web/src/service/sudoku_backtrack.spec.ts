import back_track from "./sudoku_backtrack";

describe("backtrack", () => {
  const mission =
    "970004000300700095000000002000900200100000400005006019006080000500400037000000100";
  const board = [...Array(9)]
    .map((_) => [...Array(9)])
    .map((r, i) =>
      r.map((_, j) =>
        mission.split("")[(i + 1) * j] !== "0"
          ? mission.split("")[(i + 1) * j]
          : ""
      )
    );

  it("should handle initial state", () => {
    back_track({ board });
  });
});
