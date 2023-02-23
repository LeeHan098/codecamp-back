import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  findAll() {
    const result = [];
    return result;
  }

  create() {
    return '게시물 등록 성공';
  }
}
