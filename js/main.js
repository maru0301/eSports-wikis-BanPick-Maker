////////////////////////////////////////////////////////////////////////////////////
// Global

///////////////////////////////////////
var JSON_DATA_CHAMP_IMG = {};
var JSON_DATA_TEAM = {};

var VER_CHAMPION = "";

var CDN_URL = "";

////////////////////////////////////////////////////////////////////////////////////
// Error Message
var ERROR_ID_CHAMPION_GET_ERROR 	= "チャンピオン情報が取得出来ませんでした";
var ERROR_ID_VERSION_GET_ERROR 		= "バージョン情報が取得出来ませんでした";
var ERROR_ID_TEAM_GET_ERROR 		= "チーム情報が取得出来ませんでした";

/////////////////////////////////////////////////
//

function errorDlg(msg)
{
	window.alert("エラー:" + msg);
}

////////////////////////////////////////////////////////////////////////////////////
//
var request = [
	{ error_id: ERROR_ID_VERSION_GET_ERROR,		url: './php/main.php', data: { func:"GetVersion" },  }, // Version
	{ error_id: ERROR_ID_CHAMPION_GET_ERROR,	url: './php/main.php', data: { func:"GetChampionImage" },  },
	{ error_id: ERROR_ID_TEAM_GET_ERROR,		url: './json/team.json', data: {},  },
];

var jqXHRList = [];

for( var i = 0, max = request.length ; i < max ; ++i )
{
	jqXHRList.push($.ajax(
	{
		url: request[i].url,
		type: 'GET',
		dataType: 'json',
		data: request[i].data,
	}));
}

$.when.apply(null, jqXHRList).done(function ()
{
	var json = [];
	var statuses = [];
	var jqXHRResultList = [];
	
	for( var i = 0, max = arguments.length ; i < max ; ++i )
	{
		var result = arguments[i];
		json.push(result[0]);
		statuses.push(result[1]);
		jqXHRResultList.push(result[3]);
	}
	
	///////////////////////////////////////////////////////////
	// Global情報取得
	///////////////////////////////////////////////////////////
	var verJson = json[0];
	var champImgJson = json[1]
	
	JSON_DATA_TEAM = json[2];
	
	JSON_DATA_CHAMP_IMG = new Array();
	
	for(var key in champImgJson.data)
		JSON_DATA_CHAMP_IMG.push(champImgJson.data[key]);
	
	JSON_DATA_CHAMP_IMG.sort(function(a, b)
		{
			if(a.key < b.key) return -1;
			if(a.key > b.key) return 1;
			if(a.key == b.key) return 0;
		}
	);
	
	// Version
	VER_CHAMPION = verJson.n.champion;
	
	CDN_URL = verJson.cdn;
	
	InitBanPick();
});

$.when.apply(null, jqXHRList).fail(function ()
{
	for( var i = 0 ; i < jqXHRList.length ; ++i )
	{
		if( jqXHRList[i].statusText === "error" )
		{
			errorDlg(request[i].error_id);
		}
	}
});

////////////////////////////////////////////////////////////////////////////////////
function InitBanPick()
{
	// Region
	SetRegionForm();
	// Blue
	SetTeamForm($('#region_form').val(), "blue_team");
	
	for( var i = 1 ; i <= 5 ; ++i )
	{
		// Ban
		SetChampionForm(JSON_DATA_CHAMP_IMG, "blue_ban_" + i, "blue_ban_from_" + i);
		ShowChampionIcon(0, "blue_ban_"+i);
		//Pick
		SetChampionForm(JSON_DATA_CHAMP_IMG, "blue_pick_" + i, "blue_pick_from_" + i);
		SetLaneForm("blue_pick_"+ i, "blue_lane_from_" + i);
		ShowChampionIcon(0, "blue_pick_" + i);
	}
	
	// Red
	SetTeamForm($('#region_form').val(), "red_team");
	
	for( var i = 1 ; i <= 5 ; ++i )
	{
		// Ban
		SetChampionForm(JSON_DATA_CHAMP_IMG, "red_ban_" + i, "red_ban_from_" + i);
		ShowChampionIcon(0, "red_ban_" + i);
		// Pick
		SetChampionForm(JSON_DATA_CHAMP_IMG, "red_pick_" + i, "red_pick_from_" + i);
		SetLaneForm("red_pick_"+ i, "red_lane_from_" + i);
		ShowChampionIcon(0, "red_pick_" + i);
	}
	
	$(function()
	{
		/////////////////////////////
		// Region
		/////////////////////////////
		$("select#region_form").change(function()
		{
			SetTeamForm($('#region_form').val(), "blue_team");
			SetTeamForm($('#region_form').val(), "red_team");
		});
		
		/////////////////////////////
		// Blue
		/////////////////////////////
		
		// Ban
		$("select#blue_ban_from_1").change(function()
		{
			ShowChampionIcon($('#blue_ban_from_1').val(), "blue_ban_1");
		});
		$("select#blue_ban_from_2").change(function()
		{
			ShowChampionIcon($('#blue_ban_from_2').val(), "blue_ban_2");
		});
		$("select#blue_ban_from_3").change(function()
		{
			ShowChampionIcon($('#blue_ban_from_3').val(), "blue_ban_3");
		});
		$("select#blue_ban_from_4").change(function()
		{
			ShowChampionIcon($('#blue_ban_from_4').val(), "blue_ban_4");
		});
		$("select#blue_ban_from_5").change(function()
		{
			ShowChampionIcon($('#blue_ban_from_5').val(), "blue_ban_5");
		});
		
		// Pick
		$("select#blue_pick_from_1").change(function()
		{
			ShowChampionIcon($('#blue_pick_from_1').val(), "blue_pick_1");
		});
		$("select#blue_pick_from_2").change(function()
		{
			ShowChampionIcon($('#blue_pick_from_2').val(), "blue_pick_2");
		});
		$("select#blue_pick_from_3").change(function()
		{
			ShowChampionIcon($('#blue_pick_from_3').val(), "blue_pick_3");
		});
		$("select#blue_pick_from_4").change(function()
		{
			ShowChampionIcon($('#blue_pick_from_4').val(), "blue_pick_4");
		});
		$("select#blue_pick_from_5").change(function()
		{
			ShowChampionIcon($('#blue_pick_from_5').val(), "blue_pick_5");
		});
		
		/////////////////////////////
		// Red
		/////////////////////////////
		
		// Ban
		$("select#red_ban_from_1").change(function()
		{
			ShowChampionIcon($('#red_ban_from_1').val(), "red_ban_1");
		});
		$("select#red_ban_from_2").change(function()
		{
			ShowChampionIcon($('#red_ban_from_2').val(), "red_ban_2");
		});
		$("select#red_ban_from_3").change(function()
		{
			ShowChampionIcon($('#red_ban_from_3').val(), "red_ban_3");
		});
		$("select#red_ban_from_4").change(function()
		{
			ShowChampionIcon($('#red_ban_from_4').val(), "red_ban_4");
		});
		$("select#red_ban_from_5").change(function()
		{
			ShowChampionIcon($('#red_ban_from_5').val(), "red_ban_5");
		});
		
		// Pick
		$("select#red_pick_from_1").change(function()
		{
			ShowChampionIcon( $('#red_pick_from_1').val(), "red_pick_1" );
		});
		$("select#red_pick_from_2").change(function()
		{
			ShowChampionIcon( $('#red_pick_from_2').val(), "red_pick_2" );
		});
		$("select#red_pick_from_3").change(function()
		{
			ShowChampionIcon($('#red_pick_from_3').val(), "red_pick_3");
		});
		$("select#red_pick_from_4").change(function()
		{
			ShowChampionIcon($('#red_pick_from_4').val(), "red_pick_4");
		});
		$("select#red_pick_from_5").change(function()
		{
			ShowChampionIcon($('#red_pick_from_5').val(), "red_pick_5");
		});
	});
}

function SetRegionForm()
{
	var target = document.getElementById("region");
	var newTag;
	
	newTag = document.createElement("span");
	
	var tag = new Array();
	
	tag.push("<select id='region_form'>");
	
	for( var key in JSON_DATA_TEAM )
	{
		tag.push("<option value='" + key + "' >" + key + "</option>");
	}
	
	tag.push("</select>");
	
	newTag.innerHTML = tag.join("");
	
	target.appendChild(newTag);
}

function SetTeamForm(region, getName)
{
	var target = document.getElementById(getName);
	var newTag;
	
	$("#" + getName).children().remove();
	
	newTag = document.createElement("span");
	
	var tag = new Array();
	
	tag.push("<select id='" + getName + "_form'>");
	
	for( var key in JSON_DATA_TEAM[region] )
	{
		tag.push("<option value='" + JSON_DATA_TEAM[region][key].code + "' >" + key + "</option>");
	}
	
	tag.push("</select>");
	
	newTag.innerHTML = tag.join("");
	
	target.appendChild(newTag);
}

function SetChampionForm(data, getName, createName)
{
	var target = document.getElementById(getName);
	var newTag;
	
	newTag = document.createElement("span");
	
	var tag = new Array();
	
	tag.push("<select id='" + createName + "'>");
	
	for( var i = 0 ; i < data.length ; ++i )
	{
		if( i == 0)
		{
			tag.push("<option value='" + i + "' selected>" + data[i].key + "</option>");
		}
		else
		{
			tag.push("<option value='" + i + "'>" + data[i].key + "</option>");
		}
	}
	
	tag.push("</select>");
	
	newTag.innerHTML = tag.join("");
	
	target.appendChild(newTag);
}

function ShowChampionIcon(index, getName)
{
	var target = document.getElementById(getName);
	var newTag;
	
	$("#" + getName).children(getName + "_img").remove();
	
	newTag = document.createElement(getName + "_img");
	
	var champ_img = JSON_DATA_CHAMP_IMG[index].image.full;
	var champ_name = JSON_DATA_CHAMP_IMG[index].name;
	
	newTag.innerHTML = "<img src='" + CDN_URL + "/" + VER_CHAMPION + "/img/champion/" + champ_img + "' width='20' height='20' title='" + champ_name +"'class='example3'>";
	
	target.appendChild(newTag);
}

function SetLaneForm(getName, createName)
{
	var target = document.getElementById(getName);
	var newTag;
	
	newTag = document.createElement("lane");
	
	newTag.innerHTML = "<select id='" + createName + "'>" +
			"<option value='top' selected>Top</option>" +
			"<option value='jungle'>Jungle</option>" +
			"<option value='mid'>Mid</option>" +
			"<option value='ad'>Bot</option>" +
			"<option value='support'>Support</option>" +
			"</select>";
	
	target.appendChild(newTag);
}

function GetWikisCode()
{
	var target = document.getElementById("code");
	var newTag;
	
	$("#code").children().remove();
	
	newTag = document.createElement("pre");
	
	var blue_team = $('#blue_team_form').val();
	var blue_ban = new Array();
	var blue_pick = new Array();
	var blue_lane = new Array();
	
	var red_team = $('#red_team_form').val();
	var red_ban = new Array();
	var red_pick = new Array();
	var red_lane = new Array();
	
	for( var i = 1 ; i <= 5 ; ++i )
	{
		var blue_ban_index = $('#blue_ban_from_' + i).val();
		var blue_pick_index = $('#blue_pick_from_' + i).val();
		
		blue_ban.push(JSON_DATA_CHAMP_IMG[blue_ban_index].key.toLowerCase());
		blue_pick.push(JSON_DATA_CHAMP_IMG[blue_pick_index].key.toLowerCase());
		blue_lane.push($('#blue_lane_from_' + i).val());
		
		var red_ban_index = $('#red_ban_from_' + i).val();
		var red_pick_index = $('#red_pick_from_' + i).val();
		red_ban.push(JSON_DATA_CHAMP_IMG[red_ban_index].key.toLowerCase());
		red_pick.push(JSON_DATA_CHAMP_IMG[red_pick_index].key.toLowerCase());
		red_lane.push($('#red_lane_from_' + i).val());
	}
	
	newTag.innerHTML = "<br>"+
//			"{{PicksAndBans/SectionButton|name=Week 1}}" + "<br>" +
			"{{BlockBox|start|padding=1em}}" + "<br>" +
			"<br>" +
			"{{PicksAndBansS7|team1=" + blue_team + " |team2=" + red_team + " |team1score= |team2score= |winner= " + "<br>" +
			"|blueban1=" + blue_ban[0] + "      |redban1=" + red_ban[0] + "<br>" +
			"|blueban2=" + blue_ban[1] + "      |redban2=" + red_ban[1] + "<br>" +
			"|blueban3=" + blue_ban[2] + "      |redban3=" + red_ban[2] + "<br>" +
			"|bluepick1=" + blue_pick[0] + "     |bluepick1role=" + blue_lane[0] + "<br>" +
			"                                           |redpick1=" + red_pick[0] + "    |redpick1role=" + red_lane[0] + "<br>" +
			"                                           |redpick2=" + red_pick[1] + "    |redpick2role=" + red_lane[1] + "<br>" +
			"|bluepick2=" + blue_pick[1] + "     |bluepick2role=" + blue_lane[1] + "<br>" +
			"|bluepick3=" + blue_pick[2] + "     |bluepick3role=" + blue_lane[2] + "<br>" +
			"                                           |redpick3=" + red_pick[2] + "    |redpick3role=" + red_lane[2] + "<br>" +
			"|blueban4=" + blue_ban[3] + "     |redban4=" + red_ban[3] + "<br>" +
			"|blueban5=" + blue_ban[4] + "     |redban5=" + red_ban[4] + "<br>" +
			"                                           |redpick4=" + red_pick[3] + "    |redpick4role=" + red_lane[3] + "<br>" +
			"|bluepick4=" + blue_pick[3] + "     |bluepick4role=" + blue_lane[3] + "<br>" +
			"|bluepick5=" + blue_pick[4] + "     |bluepick5role=" + blue_lane[4] + "<br>" +
			"                                           |redpick5=" + red_pick[4] + "    |redpick5role=" + red_lane[4] + "<br>" +
			"}}" + "<br>" +
			"<br>" +
			"{{BlockBox|break|padding=1em}}" + "<br>" +
			"<br>";
	
	target.appendChild(newTag);
}