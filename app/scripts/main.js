var vals = [''];
var funcs = [];
var ans = 0;


document.onreadystatechange = function()
{
	if(document.readyState == 'interactive')
	{
		// Inititialize buttons
		var buttons = document.getElementsByClassName("key");
		for(var i = 0; i < buttons.length; i++)
		{
			buttons[i].addEventListener("click", ButtonLogic);
		}
	}
};

function ButtonLogic(evt) 
{
	var btnVal = evt.target.innerHTML;
	if((0 <= btnVal && btnVal <= 9) || btnVal === '.')
	{
		processNum(btnVal);
	}
	else
	{
		/*if(vals.length - funcs.length === 1)
		{
			processFunc(btnVal);
		}*/
		if(funcs[funcs.length-1] == '=')
		{
			funcs.splice(0, funcs.length);
			vals.splice(0, vals.length, ans);
			putOnDisplay();

		}
		processFunc(btnVal);
	}

}

function processNum(btnVal) 
{
	if(btnVal == '.' && vals[vals.length-1].toString().indexOf('.') !== -1)
	{
		// Do Nothing
	}
	else
	{
		if(vals.length - funcs.length == 1)
		{
			if(btnVal == '.' && vals[vals.length-1].length < 1)
			{
				btnVal = '0' + btnVal;
			}
			vals[vals.length-1] += btnVal;
		}
		else
		{
			vals.push(btnVal);
			//calculate(funcs[funcs.length-1]);
		}

		putOnDisplay();

	}
	
}

function processFunc(btnVal) 
{
	// originally sets ans to the first value of vals
	
	if(vals.length == 1)
	{
		ans = Number(vals[vals.length-1]);
	}
	if(btnVal == "C")
	{
		clear();
	}
	else
	{
		funcs.push(btnVal);
		if(btnVal == '=')
		{
			calculate(funcs[funcs.length-2]);
		}
		else if(vals.length > 1)
		{
			calculate(funcs[funcs.length-2]);
		}
		putOnDisplay();
	}
}

function putOnDisplay()
{
	var displayText = '';
	
	for(var i = 0; i < vals.length; i++)
	{
		displayText = displayText + Math.round(vals[i] * 100) / 100;
		if(funcs[i] != null)
		{
			displayText = displayText /*+ ' '*/ + funcs[i] /*+ ' '*/;
		}
	}
	
	if(funcs[funcs.length-1] == '=')
	{
		displayText = Math.round(ans * 100) / 100;
		//var Text = eval(displayText.toString() + ';');
		//display.innerHTML = Text;
	}

	if(displayText.length > 21)
	{
		displayText = displayText.slice(displayText.length - 22, displayText.length-1);
	}
	display.innerHTML = displayText;
}

function calculate(opFunc) 
{
	var len = vals.length-1;
	vals[len] = Number(vals[len]);
	


	switch(opFunc)
	{
		case "/":
			ans = ans / vals[len];
			break;
		case "*":
			ans = ans * vals[len];
			break;
		case "-":
			ans = ans - vals[len];
			break;
		case "+":
			ans = ans + vals[len];
			break;
		case "^":
			ans = Math.pow(ans, vals[len]);
			break;
		case "=":
			// TODO: ???
			break;
		case "C":
			clear();
			break;
		default:
			alert("No function selected");
			break;
	}
	//putOnDisplay();
}

function clear()
{
	display.innerHTML = '';
	funcs.splice(0, funcs[funcs.length-1]);
	vals.splice(0, vals[vals.length-1]);
	ans = null;
}