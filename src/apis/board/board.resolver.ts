import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/createboard.dto';
import { Board } from './entities/board.entitiy';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}
  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    @Args('writer') writer: string,
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    console.log(writer);
    console.log(title);
    console.log(contents);
    console.log(createBoardInput);
    return this.boardService.create();
  }
}
