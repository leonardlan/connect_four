// Connect Four
var matrix;
var player1 = 1;
var win_flag = 0;

function initMatrix(){
    // Initialize the matrix with a two-dimensional array,
    // with 6 rows and 7 columns, setting all values to 0.
    matrix = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
    return matrix;
}

function MouseRollover(MyImage) {
	MyImage.src = "images/column_button_alt.png";
}

function MouseOut(MyImage) {
	MyImage.src = "images/column_button.png";
}

function MouseRolloverR(MyImage) {
	MyImage.src = "images/reset_button_alt.png";
}

function MouseOutR(MyImage) {
	MyImage.src = "images/reset_button.png";
}

function getDropPosition(matrix, columnPosition){
    // This method returns the position of row (i.e., cell's row position)
    // Find the blank cell {i.e., for value 0} from row 5 to 0.
    // If there is no blank cell in that column return -1.
    for(var i = 5; i >= 0; i -= 1){
        if(matrix[i][columnPosition]===0)
            return i;
    }
    return -1;
}
    
function setDropValue(matrix, rowPosition, columnPosition, player1){
    // This method returns a matrix with values,
    // value 1 if human is true otherwise value 2
    matrix[rowPosition][columnPosition] = player1 ? 1 : 2;
    return matrix;
}

function getRowWin(matrix){
    // set 4 [i,j] values to a functionault cell position say -1 in a list.
    // [[-1,-1][-1,-1][-1,-1][-1,-1]]
    // For each row, check if any 4 consecutive similar values are there,
    // if so return the positions as a list [[row1, col1],[row2, col2],[row3, col3],[row4, col4]].
    var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
    var row = 5;
    while(row >= 0){
        var col = 0;
        while(col <= 3){
            if(matrix[row][col] != 0){
                val = matrix[row][col];
                if(matrix[row][col + 1] == val && matrix[row][col + 2] == val && matrix[row][col + 3] == val){
                    winPositions = [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]];
                    return 1;
                }
            }
            col = col + 1;
        }
        row = row - 1;
    }
    return 0;
}

function getColumnWin(matrix){
    // Similarly, set 4 [i,j] functionault values in a list, for each column,
    // check for any 4 consecutive cells with same values and then return
    // their positions in the list.
      var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
    var col = 0;
    while(col <= 6){
        var row = 5;
        while(row >= 3){
            if(matrix[row][col] != 0){
                val = matrix[row][col];
                if(matrix[row - 1][col] == val && matrix[row - 2][col] == val && matrix[row - 3][col] == val){
                    winPositions = [[row, col], [row - 1, col], [row - 2, col], [row - 3, col]];
                    return 1;
                }
            }
            row = row - 1;
        }
        col = col + 1;
    }
    return 0;
}

function getDiagonalLeftToRightWin(matrix){
    // Similarly, set 4 [i,j] functionault values in a list.
    // Starting from left corner for each diagonal going right up check for 4 consecutive cells
    // with same values and return their positions.
        var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
    var row = 5;
    while(row >= 3){
        var col = 0;
        while(col <= 3){
            if(matrix[row][col] != 0){
                val = matrix[row][col];
                if(matrix[row - 1][col + 1] == val && matrix[row - 2][col + 2] == val && matrix[row - 3][col + 3] == val){
                    winPositions = [[row, col], [row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3]];
                    return 1;
                }
            }
            col = col + 1;
        }
        row = row - 1;
    }
    return 0;
}

function getDiagonalRightToLeftWin(matrix){
    // Similarly, set 4 [i,j] functionault values in a list.
    // Starting from right corner for each diagonal going left up check for 4 consecutive cells
    // with same values and return their positions.
     var winPositions = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
    var row = 5;
    var col = 6;
    while(row >= 3){
        while(col >= 3){
            if(matrix[row][col] != 0){
                val = matrix[row][col];
                if(matrix[row - 1][col - 1] == val && matrix[row - 2][col - 2] == val && matrix[row - 3][col - 3] == val){
                    winPositions = [[row, col], [row - 1, col - 1], [row - 2, col - 2], [row - 3, col - 3]];
                    return 1;
                }
            }
            col = col - 1;
        }
        col = 6;
        row = row - 1;
    }
    return 0;
}

function hasWon(){
	return getRowWin(matrix)||getColumnWin(matrix)||getDiagonalLeftToRightWin(matrix)||getDiagonalRightToLeftWin(matrix);
}

function isGameOver(matrix){
    // If the entire matrix is filled and there are no winners then the Game is Over.
    for(var i = 0; i < matrix.length; i += 1)
        for(var j = 0; j < matrix[i].length; j+= 1){
            if(matrix[i][j] === 0)
                return false;
        }
        return true;
}

function toggle()
{
	if(player1===1){
		player1 = 0;
		document.getElementById('turn').innerHTML = 'player2\'s turn';
		return "player2";
	}
	player1 = 1;
	document.getElementById('turn').innerHTML = 'player1\'s turn';
	return "player1";
}

// Column Button Mouse Down
function handleM1Down()
{
	if(!win_flag){
		var str = "empty_button", pos = getDropPosition(matrix, 0);
		setDropValue(matrix, pos, 0, player1);
		pos+=1;
		str = str+pos+"1";
		document.images[str].src = "images/" + toggle() + "_button.png";
		if(hasWon()){
			win_flag = 1;
			if(!player1){
				document.getElementById('result').innerHTML = 'player1 won';
			}
			else
			{
				document.getElementById('result').innerHTML = 'player2 won';
			}
		}
	}
	return true;
}

function handleM2Down()
{
	if(!win_flag){
	var str = "empty_button", pos = getDropPosition(matrix, 1);
	setDropValue(matrix, pos, 1, player1);
	pos+=1;
	str = str+pos+"2";
	document.images[str].src = "images/" + toggle() + "_button.png";
	if(hasWon()){
		win_flag = 1;
		if(!player1){
			document.getElementById('result').innerHTML = 'player1 won';
		}
		else
		{
			document.getElementById('result').innerHTML = 'player2 won';
		}
	}
	}
	return true;
}

function handleM3Down()
{
	if(!win_flag){
	var str = "empty_button", pos = getDropPosition(matrix, 2);
	setDropValue(matrix, pos, 2, player1);
	pos+=1;
	str = str+pos+"3";
	document.images[str].src = "images/" + toggle() + "_button.png";
	if(hasWon()){
		win_flag = 1;
		if(!player1){
			document.getElementById('result').innerHTML = 'player1 won';
		}
		else
		{
			document.getElementById('result').innerHTML = 'player2 won';
		}
	}
	}
	return true;
}
function handleM4Down()
{
	if(!win_flag){
	var str = "empty_button", pos = getDropPosition(matrix, 3);
	setDropValue(matrix, pos, 3, player1);
	pos+=1;
	str = str+pos+"4";
	document.images[str].src = "images/" + toggle() + "_button.png";
	if(hasWon()){
		win_flag = 1;
		if(!player1){
			document.getElementById('result').innerHTML = 'player1 won';
		}
		else
		{
			document.getElementById('result').innerHTML = 'player2 won';
		}
	}
	}
	return true;
}
function handleM5Down()
{
	if(!win_flag){
	var str = "empty_button", pos = getDropPosition(matrix, 4);
	setDropValue(matrix, pos, 4, player1);
	pos+=1;
	str = str+pos+"5";
	document.images[str].src = "images/" + toggle() + "_button.png";
	if(hasWon()){
		win_flag = 1;
		if(!player1){
			document.getElementById('result').innerHTML = 'player1 won';
		}
		else
		{
			document.getElementById('result').innerHTML = 'player2 won';
		}
	}
	}
	return true;
}
function handleM6Down()
{
	if(!win_flag){
	var str = "empty_button", pos = getDropPosition(matrix, 5);
	setDropValue(matrix, pos, 5, player1);
	pos+=1;
	str = str+pos+"6";
	document.images[str].src = "images/" + toggle() + "_button.png";
	if(hasWon()){
		win_flag = 1;
		if(!player1){
			document.getElementById('result').innerHTML = 'player1 won';
		}
		else
		{
			document.getElementById('result').innerHTML = 'player2 won';
		}
	}
	}
	return true;
}
function handleM7Down()
{
	if(!win_flag){
		var str = "empty_button", pos = getDropPosition(matrix, 6);
		setDropValue(matrix, pos, 6, player1);
		pos+=1;
		str = str+pos+"7";
		document.images[str].src = "images/" + toggle() + "_button.png";
		if(hasWon()){
			win_flag = 1;
			if(!player1){
				document.getElementById('result').innerHTML = 'player1 won';
			}
			else
			{
				document.getElementById('result').innerHTML = 'player2 won';
			}
		}
	}
	return true;
}

function handleMresetDown()
{
	initMatrix();
	var str;
	for(var i=1;i<=6;i+=1){
		for(var j=1;j<=7;j+=1){
			str = "empty_button"+i+j;
			//document.writeln(str+"\n");
			document.images[str].src = "images/empty_button.png";
		}
	}
	win_flag = 0;
	document.getElementById('result').innerHTML = '';
	//document.writeln("Test1");
	return true;
}

initMatrix();
/*while(!getRowWin(matrix)&&!getColumnWin(matrix)&&!getDiagonalLeftToRightWin(matrix)&&!getDiagonalRightToLeftWin(matrix)&&!isGameOver(matrix)) {
	document.writeln('Test');
}*/
//document.writeln('End of JScript');