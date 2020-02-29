// É necessário definir qual é o cod. do site referente
// var site_id = 99999;

if ( this['site_id'] == null )
{
	// Caso não definido, seta como 1 (padrao)
	var site_id = 1;
}

document.write( get_ad( site_id ) );


function get_random(min,max)
{
	// Gera valores [min,max] (intervalo fechado)
    var ranNum= min + Math.round(Math.random()*max);
    return ranNum;
}

function get_ad( site_id ) 
{
	
	if ( site_id == 51 )
	{
		str = "<iframe src='http://www.pokeland.net/pic/site/a_d/meio-forum_forum.htm' width='468' height=60' marginwidth='0' marginheight='0' frameborder='0' frameSpacing='0' cellSpacing='0' cellPadding='0' scrolling='no' noResize></iframe>";

		return str;
	}



	var max = 40;

	// codigo do buscapé
	var img_array = new Array( 
		"full_prod_digital.gif" ,
		"b_inst_t1_cAM.gif" ,
		"b_inst_t1_cdrw.gif" ,
		"b_inst_t1_celular.gif" ,
		"b_inst_t1_dvdcdrw.gif" ,
		"b_inst_t1_playstation.gif" ,
		"b_inst_t2_playstation.gif" ,
		"full_bp_duvida2_cel.gif" 
		);
	var img_2id =  new Array(
		43 ,
		45 ,
		47 ,
		48 ,
		50 ,
		56 ,
		68 ,
		37
		);

	var keys_search = new Array (
		"Pokemon Platinium" , 
		"Nintendo DSi" , 
		"Nintendo Wii" ,
		"Pokemon HeartHold" , 
		"XBOX 360" , 
		"playstation 3"
		);
	
	var rand = get_random( 0 , max );

	// Retirar SOFT LICK!
	
	// de 0 - 10 = softclick
	if ( rand <= -1 ) // 28
	{
		str = " <!--- Início do código do Soft Click --->";
		str += " <IFRAME SRC='http://www.softclick.com.br/r.asp?COD=7436&ID=pokeland&P="+site_id+"&C=102' name='softclick1' width='470' height='62' frameborder='0' border='0' marginheight='0' marginwidth='0' scrolling='no'>";
		str += " <A HREF='http://www.softclick.com.br/link.asp?COD=7436&ID=pokeland&P="+site_id+"&C=102&N=1' target='_top'>";
		str += " <IMG ALT='Patrocinado por Soft Click' WIDTH='468' HEIGHT='60' BORDER='1' SRC='http://www.softclick.com.br/redir.asp?COD=7436&ID=pokeland&P="+site_id+"&C=102'></A>";
		str += " </IFRAME><BR><!----- Fim do codigo do Soft Click ---->		";

		return str;
	} 

	if ( rand <= 32 ) 
	{
		 var ph_num = get_random( 0 , keys_search.length-1 );
		 var phrase = keys_search[ ph_num ];
		 str = '<form id="FrmProcura" name="FrmProcura" method="GET" action="http://www.buscape.com.br/cprocura.asp" target="_blank">';
		 str += '<input type="hidden" name="modelo" id="modelo" value="2" />';
		 str += '<input type="hidden" name="site_origem" id="site_origem" value="7565" />';
		 str += '<table width="468" border="0" cellspacing="0" cellpadding="0" bgcolor="#000000" height="60">';
		 str += '<tr><td height="2" valign="top" colspan="3" width="468"><div align="center">';
		 str += '<font face="Arial, Helvetica" color="#FFFFFF" size="2"><b>Compare Pre&ccedil;os</b></font></div>';
		 str += '</td></tr><tr bgcolor="#FFCF31"><td width="260"><div align="center">';
		 str += '<font color="333333" size="1" face="Verdana, Arial, Helvetica, sans-serif">';
		 str += 'Digite produto ou marca </font><b><font size="2" color="#0033CC"><br /></font>';
		 str += '<input type="text" name="produto" value="'+phrase+'" id="produto" style="width: 200px; font-family: verdana; font-size: 10px" />';
		 str += '<input type="hidden" name="site_origem" id="site_origem" value="7565" /><input type="hidden" name="modelo" id="modelo" value="2" />';
		 str += '</b></div></td><td width="130" rowspan="2" valign="top">';
		 str += '<img border="0" src="http://www.pokeland.net/pic/site/a_d/wii.gif" width="120" height="51" /></td>';
		 str += '<td width="78" rowspan="2" valign="middle"><img border="0" src="http://www.pokeland.net/pic/site/a_d/buscape_logo.gif" width="88" height="31" /></td>';
		 str += '</tr><tr bgcolor="#FFCF31"><td width="260"><div style="text-align: right; padding-right:25px">';
		 str += '<input type="image" src="http://www.pokeland.net/pic/site/a_d/botao_compar_precos.gif" border="0" name="image2" height="15" />';
		 str += '</div></td></tr><tr bgcolor="#000000"><td height="1" width="468" colspan="3">';
		 str += '<spacer type="block" width="5" height="5" /></td></tr></table></form>';
 		return str;
	}


	if ( rand <= 40 ) 
	{
		// 7 possibilidades
		var num = rand - 33;
		/*
		str = "<a href='http://www.buscape.com.br/default.asp?site_origem=7565&modelo="+img_2id[num]+"'>";
		str += "<img src='http://www.pokeland.net/pic/site/a_d/"+img_array[num]+"' border='0' width='468' height='60'>";
		str += "</a>";
		*/
		str = "<!-- Anúncio Dinâmico LOMADEE - INÍCIO -->";
		str += "<div style='width:468px; height:60px; overflow:hidden;'><div style='overflow:hidden;'>";
		str += "<script language='javascript' src='http://ivitrine.buscape.com/bpadsvar.js'></script>";
		str += "<script language='javascript' >";
		str += "buscapeads_afiliado = '9853'; buscapeads_tipo_cliente = '2'; buscapeads_vitrine_local = 'BR';";
		str += "buscapeads_site_origem = '10872141'; buscapeads_vitrine_vers = '1.23'; buscapeads_formato = '468x60';";
		str += "buscapeads_id_keyword = '267886'; buscapeads_txt_keyword = ''; buscapeads_tipo_canal = '42';";
		str += "buscapeads_categorias = '188,2443,9610,6632'; buscapeads_excluir = '3'; buscapeads_idioma = 'pt';";
		str += "buscapeads_pais = 'BR'; buscapeads_area = ''; buscapeads_estado = ''; buscapeads_cidade = ''; buscapeads_cep = '';";
		str += "</script>";
		str += "<script language='javascript' src='http://ivitrine.buscape.com/bpads.js'></script></div>";
		str += "<a href='http://www.lomadee.com/'><font size='1'><div align='right'>Lomadee, uma nova espécie na web. A maior plataforma de afiliados da América Latina</div></font></a></div>";
		str += "<!-- Anúncio Dinâmico LOMADEE - FIM -->";
		
		return str;
	}


}
