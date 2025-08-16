import {
  PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components";

type PaginationProps = {
  total?: number;
  current?: number;
  onChange?: (page: number) => void;
};

export function Pagination({ total, current = 0, onChange }: PaginationProps) {
  let options: number[] = [];

  if (!total) {
    return null;
  }

  if (total <= 7) {
    options = Array.from({ length: total }, (_, i) => i + 1);
  } else if (current <= 4) {
    options = [1, 2, 3, 4, 5, 0, total];
  } else if (current >= total - 3) {
    options = [1, 0, total - 4, total - 3, total - 2, total - 1, total];
  } else {
    options = [1, 0, current - 1, current, current + 1, 0, total];
  }

  return (
    <PaginationContainer>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={current === 1} onClick={() => onChange?.(current - 1)} />
        </PaginationItem>

        {options.map((option, index) =>
          option ? (
            <PaginationItem key={index}>
              <PaginationLink active={option === current} onClick={() => onChange?.(option)}>
                {option}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext disabled={current === total} onClick={() => onChange?.(current + 1)} />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
}
