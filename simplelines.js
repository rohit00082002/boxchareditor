function updateTablesSimple(oldpos, newpos, brush) {
  function updatePos(x,y) {
    if (x < 0 || y < 0) return;
    if (y >= model.bufferRows || x >=model.bufferLength) return;
    if (lines[y][x] == '|') 
      if (lines[y][x-1] == '-' || lines[y][x+1] == '-') lines[y][x] = '+';
    if (lines[y][x] == '-')
      if ((y>0 && lines[y-1][x] == '|') || lines[y+1][x] == '|') lines[y][x] = '+';
    if (lines[y][x] == '+') {
      if ( (  (y>0 && lines[y-1][x] == ' ') || (y>0 && lines[y-1][x] == '-'))  && (lines[y+1][x] == ' ' || lines[y+1][x] == '-') )  lines[y][x] = '-';
      if ( (lines[y][x-1] == ' ' || lines[y][x-1] == '|') && (lines[y][x+1] == ' ' || lines[y][x+1] == '|') )  lines[y][x] = '|';
    }
  }
  function updateCursor(x,y,line) {
    if (brush == ' ')
      lines[y][x] = line;
    else if (lines[y][x] == '+')
      return; // | or - on +
    else if (lines[y][x] == ' ')
      lines[y][x] = line; // - or | on ' '
    else if (lines[y][x] != line)
      lines[y][x] = '+'; // | on - or - on |
    else
      return; // | on | or - on -
  }
  var line;
  if (brush == BRUSHERASE)
    line = ' '
  else if (oldpos.col != newpos.col)
    line = '-'
  else if (oldpos.row != newpos.row)
    line = '|'
  else
    return;
  updateCursor(oldpos.col,oldpos.row, line);
  updateCursor(newpos.col,newpos.row, line);
  if (line == ' ' || lines[oldpos.row][oldpos.col] != '+')
    lines[oldpos.row][oldpos.col] = line;
  if (line == ' ' || lines[newpos.row][newpos.col] != '+')
    lines[newpos.row][newpos.col] = line;
  for (var x = Math.min(oldpos.col,newpos.col)-1;x<=Math.max(oldpos.col,newpos.col)+1;x++ ){
    for (var y = Math.min(oldpos.row,newpos.row)-1;y<=Math.max(oldpos.row,newpos.row)+1;y++ ){
      updatePos(x,y)
    }
  }
}
