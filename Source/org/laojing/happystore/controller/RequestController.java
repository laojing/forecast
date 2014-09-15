package org.laojing.happystore.controller;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Date;
import java.util.HashMap;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import org.laojing.happystore.persistence.StoreDao;

@Controller
@RequestMapping({"/","/index"})
public class RequestController 
{
	private @Autowired ServletContext servletContext;
	private StoreDao storeDao;

	@Autowired
	public RequestController(StoreDao storeDao){
		this.storeDao = storeDao;
	}
	@Autowired
	ServletContext context;

	@RequestMapping(method=RequestMethod.GET)
	public String printProject(ModelMap model,HttpSession session){
		return "index";
	}

	@RequestMapping(value="/login", method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> login(
			@RequestParam("username") String username,
			@RequestParam("passwd") String passwd ) {
		Map<String,Object> map = new HashMap<String,Object>();	
		String levels = storeDao.getUser( username, passwd );
		if ( levels.equals("") ) {
			map.put("result", "error" );
		} else {
			map.put("result", "ok" );
			map.put("username", username );
			map.put("levels", levels );
		}
		return map;
	}

	@RequestMapping(value="/changepass", method=RequestMethod.POST)
	public @ResponseBody Map<String,Object> changepass(
			@RequestParam("username") String username,
			@RequestParam("oldpasswd") String oldpasswd,
			@RequestParam("newpasswd") String newpasswd ) {
		Map<String,Object> map = new HashMap<String,Object>();	
		if ( storeDao.changePass ( username, oldpasswd, newpasswd )) {
			map.put("result", "ok" );
		} else {
			map.put("result", "error" );
		}
		return map;
	}

	@RequestMapping(value="adduser", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> addUsers(
			@RequestParam("username") String username,
			@RequestParam("passwd") String passwd,
			@RequestParam("phone") String phone,
			@RequestParam("unit") String unit,
			@RequestParam("levels") String levels) {
		Map<String,Object> map = new HashMap<String,Object>();
		if ( storeDao.addUser ( username, passwd, phone, unit, levels ) ) {
			map.put("result", "ok");
		} else {
			map.put("result", "error");
		}
		return map;
	}

	@RequestMapping(value="users", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getUsers(
			@RequestParam("userlevel") String userlevel) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("users", storeDao.getUsers(userlevel));
		return map;
	}

	@RequestMapping(value="deleteusers", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> deleteUsers(
			@RequestParam("userid") String userid ) {
		Map<String,Object> map = new HashMap<String,Object>();
		if ( storeDao.deleteUser ( userid ) ) {
			map.put("result", "ok");
		} else {
			map.put("result", "error");
		}
		return map;
	}


	@RequestMapping(value="listfarms", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getListFarms() {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("farms", storeDao.getListFarms());
		map.put("turbines", storeDao.getListTurbines());
		return map;
	}

	@RequestMapping(value="controlturb", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> controlTurb(
			@RequestParam("farmnum") String farmnum,
			@RequestParam("turbinenum") String turbinenum,
			@RequestParam("turbcmd") String turbcmd ) {
		Map<String,Object> map = new HashMap<String,Object>();
		storeDao.setCommand ( farmnum, turbinenum, turbcmd );
		map.put("result", "ok");
		return map;
	}

	@RequestMapping(value="updateturb", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> updateTurb(
			@RequestParam("farmnum") String farmnum,
			@RequestParam("turbinenum") String turbinenum ) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("result", storeDao.getTurbineMonitor ( farmnum, turbinenum ));
		return map;
	}


	@RequestMapping(value="updatehome", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getUpdateHome() {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("home", storeDao.getHomes());
		return map;
	}

	@RequestMapping(value="getfarmturbines", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getFarmTurbines(
			@RequestParam("farmnum") String farmnum ) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("turbines", storeDao.getTurbineNames ( farmnum ));
		return map;
	}

	@RequestMapping(value="getfarmnames", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getFarmNames(){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("names", storeDao.getFarmNames ());
		return map;
	}
	@RequestMapping(value="getturbineover", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getTurbineOver(
			@RequestParam("farmnum") String farmnum ) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("turbines", storeDao.getTurbineOver ( farmnum ));
		return map;
	}

	
	@RequestMapping(value="html", method=RequestMethod.GET)
	public @ResponseBody Map<String,Object> getUnit(@RequestParam("geturl") String geturl) {
		Map<String,Object> map = new HashMap<String,Object>();
		InputStream inputStream = null;
		String result = ""; 
		
		BufferedReader br = null;
		StringBuffer buffer = null;
		try{   
			inputStream = servletContext.getResourceAsStream("/WEB-INF/Html/"+geturl+".html");  
			
			buffer = new StringBuffer();   
			InputStreamReader isr = new InputStreamReader(inputStream,"utf-8");   
			br = new BufferedReader(isr);    
			int s;   
			while((s = br.read())!=-1){    
				buffer.append((char)s);   
			}   
			result = buffer.toString();
		}catch(Exception e){  
			e.printStackTrace();  		
		}
		
		map.put("html", result);		
		return map;
	}
	


}

