const TREATMENTS_DELIMITER 	= "*TREATMENTS";
const CULTIVARS_DELIMITER 	= "*CULTIVARS";
const FIELDS_DELIMITER 		= "*FIELDS";
const PLANTING_DELIMITER 	= "*PLANTING";
const FERTILIZERS_DELIMITER = "*FERTILIZERS";
const TILLAGE_DELIMITER 	= "*TILLAGE";
const HARVEST_DELIMITER 	= "*HARVEST";
const SIMULATION_DELIMITER 	= "*SIMULATION";
const INITIAL_DELIMITER		= "*INITIAL CONDITIONS";
const IRRIGATION_DELIMITER	= "*IRRIGATION";

class Xfile {
    constructor(fs){
        this._fs = fs;
    }
	getTreatments(globalBasePath, folder, delimiterPath, experiments) {
		let treatments = [];
		
        for (let i = 0; i < experiments.length; i++) {
          let filePath = globalBasePath + folder + delimiterPath + experiments[i];
          let data = this._fs.readFileSync(filePath);
          let content = data.toString();
          let str = content.substring(content.indexOf(TREATMENTS_DELIMITER), content.indexOf(CULTIVARS_DELIMITER));
          let lines = str.split(/[\r\n]+/g);
    
          for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				//let col					= lines[j].trim().split(" ");
				
				let N_Level				= lines[j].substring(0, 2).trim();
				let R_RotNum			= lines[j].substring(2, 4).trim();
				let O_RotOption			= lines[j].substring(4, 6).trim();
				let C_CropComp			= lines[j].substring(6, 8).trim();
				let TNAME_Description 	= lines[j].substring(9, 34).trim();
				// factor levels
				let CU_Cultivar 		= lines[j].substring(35, 37).trim();
				let FL_Field 			= lines[j].substring(38, 40).trim();
				let SA_SoilAnal 		= lines[j].substring(41, 43).trim();
				let IC_InitCond 		= lines[j].substring(44, 46).trim();
				let MP_Plant 			= lines[j].substring(47, 49).trim();
				let MI_Irrigat 			= lines[j].substring(50, 52).trim();
				let MF_Fertil 			= lines[j].substring(53, 55).trim();
				let MR_Resid 			= lines[j].substring(56, 58).trim();
				let MC_ChemApp 			= lines[j].substring(59, 61).trim();
				let MT_Tillage 			= lines[j].substring(62, 64).trim();
				let ME_EnvMod 			= lines[j].substring(65, 67).trim();
				let MH_Harv 			= lines[j].substring(68, 71).trim();
				let SM_SimContr 		= lines[j].substring(72, 74).trim();
				
				let obj = {N_Level: N_Level, R_RotNum: R_RotNum, O_RotOption: O_RotOption, C_CropComp: C_CropComp, TNAME_Description: TNAME_Description, CU_Cultivar: CU_Cultivar, FL_Field: FL_Field, SA_SoilAnal: SA_SoilAnal, IC_InitCond: IC_InitCond, MP_Plant: MP_Plant, MI_Irrigat: MI_Irrigat, MF_Fertil: MF_Fertil, MR_Resid: MR_Resid, MC_ChemApp: MC_ChemApp, MT_Tillage: MT_Tillage, ME_EnvMod: ME_EnvMod, MH_Harv: MH_Harv, SM_SimContr: SM_SimContr};
				
				treatments.push(obj);
            }
          }
        }
        return treatments;
    }
	getCultivars(globalBasePath, folder, delimiterPath, experiments) {
		let cultivars = [];
		
        for (let i = 0; i < experiments.length; i++) {
          let filePath = globalBasePath + folder + delimiterPath + experiments[i];
          let data = this._fs.readFileSync(filePath);
          let content = data.toString();
          let str = content.substring(content.indexOf(CULTIVARS_DELIMITER), content.indexOf(FIELDS_DELIMITER));
          let lines = str.split(/[\r\n]+/g);
    
          for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				let C					= lines[j].substring(0, 2).trim();
				let CR					= lines[j].substring(2, 5).trim();
				let INGENO				= lines[j].substring(6, 12).trim();
				let CNAME				= lines[j].substring(13, 40).trim();
				
				let obj = {C: C, CR: CR, INGENO: INGENO, CNAME: CNAME};

				cultivars[C] = obj;
            }
          }
        }
        return cultivars;
    }
	getFertilizers(globalBasePath, folder, delimiterPath, experiments) {
		let fertilizers = [];
		
        for (let i = 0; i < experiments.length; i++) {
          let filePath = globalBasePath + folder + delimiterPath + experiments[i];
          let data = this._fs.readFileSync(filePath);
          let content = data.toString();
          let str = content.substring(content.indexOf(FERTILIZERS_DELIMITER), content.indexOf(TILLAGE_DELIMITER));
          let lines = str.split(/[\r\n]+/g);
    
          for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				let F					= lines[j].substring(0, 2).trim();
				let FDATE				= lines[j].substring(3, 8).trim();
				let FMCD				= lines[j].substring(9, 14).trim();
				let FACD				= lines[j].substring(15, 20).trim();
				let FDEP				= lines[j].substring(22, 26).trim();
				let FAMN				= lines[j].substring(28, 32).trim();
				let FAMP				= lines[j].substring(34, 38).trim();
				let FAMK				= lines[j].substring(40, 44).trim();
				let FAMC				= lines[j].substring(46, 50).trim();
				let FAMO				= lines[j].substring(52, 56).trim();
				let FOCD				= lines[j].substring(58, 62).trim();
				let FERNAME				= lines[j].substring(63, 69).trim();
				
				
				let obj = {F: F, FDATE: FDATE, FMCD: FMCD, FACD: FACD, FDEP: FDEP, FAMN: FAMN, FAMP: FAMP, FAMK: FAMK, FAMC: FAMC, FAMO: FAMO, FOCD: FOCD, FERNAME: FERNAME};
				
				fertilizers[F] = obj;
            }
          }
        }
        return fertilizers;
    }
	getTillage(globalBasePath, folder, delimiterPath, experiments) {
		let tillage = [];
		
        for (let i = 0; i < experiments.length; i++) {
          let filePath = globalBasePath + folder + delimiterPath + experiments[i];
          let data = this._fs.readFileSync(filePath);
          let content = data.toString();
          let str = content.substring(content.indexOf(TILLAGE_DELIMITER), content.indexOf(HARVEST_DELIMITER));
          let lines = str.split(/[\r\n]+/g);
		  
          for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				let T					= lines[j].substring(0, 2).trim();
				let TDATE				= lines[j].substring(3, 8).trim();
				let TIMPL				= lines[j].substring(9, 14).trim();
				let TDEP				= lines[j].substring(16, 20).trim();
				let TNAME				= lines[j].substring(21, 26).trim();
				
				let obj = {T: T, TDATE: TDATE, TIMPL: TIMPL, TDEP: TDEP, TNAME: TNAME};
				
				tillage[T] = obj;
            }
          }
        }
        return tillage;
    }
	getPlantingDetails(globalBasePath, folder, delimiterPath, experiments) {
		let planting = [];
		
        for (let i = 0; i < experiments.length; i++) {
          let filePath = globalBasePath + folder + delimiterPath + experiments[i];
          let data = this._fs.readFileSync(filePath);
          let content = data.toString();
		  
		  let aux_end_delimiter = content.indexOf(FERTILIZERS_DELIMITER); // 1
          if(aux_end_delimiter < 0)
              aux_end_delimiter = content.indexOf(TILLAGE_DELIMITER); // 2
		  if(aux_end_delimiter < 0)
              aux_end_delimiter = content.indexOf(IRRIGATION_DELIMITER); // 3
          if(aux_end_delimiter < 0)
              aux_end_delimiter = content.indexOf(HARVEST_DELIMITER); // 4
		  
          let str = content.substring(content.indexOf(PLANTING_DELIMITER), aux_end_delimiter);
		  
          let lines = str.split(/[\r\n]+/g);
		  
          for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				let P					= lines[j].substring(0, 2).trim();
				let PDATE				= lines[j].substring(3, 8).trim();
				let EDATE				= lines[j].substring(9, 14).trim();
				let PPOP				= lines[j].substring(16, 20).trim();
				let PPOE				= lines[j].substring(22, 26).trim();
				let PLME				= lines[j].substring(28, 32).trim();
				let PLDS				= lines[j].substring(34, 38).trim();
				let PLRS				= lines[j].substring(40, 44).trim();
				let PLRD				= lines[j].substring(46, 50).trim();
				let PLDP				= lines[j].substring(52, 56).trim();
				let PLWT				= lines[j].substring(58, 62).trim();
				let PAGE				= lines[j].substring(64, 68).trim();
				let PENV				= lines[j].substring(70, 74).trim();
				let PLPH				= lines[j].substring(76, 80).trim();
				let SPRL				= lines[j].substring(82, 86).trim();
				let PLNAME				= lines[j].substring(88, 116).trim();
				
				let obj = {P: P, PDATE: PDATE, EDATE: EDATE, PPOP: PPOP, PPOE: PPOE, PLME: PLME, PLDS: PLDS, PLRS: PLRS, PLRD: PLRD, PLDP: PLDP, PLWT: PLWT, PAGE: PAGE, PENV: PENV, PLPH: PLPH, SPRL: SPRL, PLNAME: PLNAME};
				
				planting[P] = obj;
            }
          }
        }
        return planting;
    }
	getHarvestDetails(globalBasePath, folder, delimiterPath, experiments) {
		let harvest = [];
		
        for (let i = 0; i < experiments.length; i++) {
          let filePath = globalBasePath + folder + delimiterPath + experiments[i];
          let data = this._fs.readFileSync(filePath);
          let content = data.toString();
          let str = content.substring(content.indexOf(HARVEST_DELIMITER), content.indexOf(SIMULATION_DELIMITER));
          let lines = str.split(/[\r\n]+/g);
    
          for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				let H					= lines[j].substring(0, 2).trim();
				let HDATE				= lines[j].substring(3, 8).trim();
				let HSTG				= lines[j].substring(9, 14).trim();
				let HCOM				= lines[j].substring(16, 20).trim();
				let HSIZE				= lines[j].substring(21, 26).trim();
				let HPC					= lines[j].substring(28, 32).trim();
				let HBPC				= lines[j].substring(34, 38).trim();
				let HNAME				= lines[j].substring(39, 44).trim();
				
				let obj = {H: H, HDATE: HDATE, HSTG: HSTG, HCOM: HCOM, HSIZE: HSIZE, HPC: HPC, HBPC: HBPC, HNAME: HNAME};
				
				harvest[H] = obj;
            }
          }
        }
        return harvest;
	
    }
	getInitialConditions(globalBasePath, folder, delimiterPath, experiments) {
		let initial = [];
		
        for (let i = 0; i < experiments.length; i++) {
          let filePath = globalBasePath + folder + delimiterPath + experiments[i];
          let data = this._fs.readFileSync(filePath);
          let content = data.toString();
          let str = content.substring(content.indexOf(INITIAL_DELIMITER), content.indexOf(PLANTING_DELIMITER));
          let lines = str.split(/[\r\n]+/g);
    
          for (let j = 2; j < 3; j++) {
			if(lines[j].trim() != ""){
				
				let PCR					= lines[j].substring(5, 8).trim();
				let ICDAT				= lines[j].substring(9, 14).trim();
				let ICRT				= lines[j].substring(16, 20).trim();
				let ICND				= lines[j].substring(21, 26).trim();
				let ICRN				= lines[j].substring(28, 32).trim();
				let ICRE				= lines[j].substring(34, 38).trim();
				let ICWD				= lines[j].substring(39, 44).trim();
				let ICRES				= lines[j].substring(45, 50).trim();
				let ICREN				= lines[j].substring(51, 56).trim();
				let ICREP				= lines[j].substring(57, 62).trim();
				let ICRIP				= lines[j].substring(63, 68).trim();
				let ICRID				= lines[j].substring(69, 74).trim();
				let ICNAME				= lines[j].substring(75, 80).trim();
				
				let obj = {PCR: PCR, ICDAT: ICDAT, ICRT: ICRT, ICND: ICND, ICRN: ICRN, ICRE: ICRE, ICWD: ICWD, ICRES: ICRES, ICREN: ICREN, ICREP: ICREP, ICRIP: ICRIP, ICRID: ICRID, ICNAME: ICNAME};
				
				initial.push(obj);
				
            }
          }
        }
        return initial;
	
    }
	getInitialConditionsProfile(globalBasePath, folder, delimiterPath, experiments) {
		let initial = [];
		
        for (let i = 0; i < experiments.length; i++) {
          let filePath = globalBasePath + folder + delimiterPath + experiments[i];
          let data = this._fs.readFileSync(filePath);
          let content = data.toString();
          let str = content.substring(content.indexOf(INITIAL_DELIMITER), content.indexOf(PLANTING_DELIMITER));
          let lines = str.split(/[\r\n]+/g);
    
          for (let j = 4; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				
				let ICBL				= lines[j].substring(4, 8).trim();
				let SH2O				= lines[j].substring(9, 14).trim();
				let SNH4				= lines[j].substring(16, 20).trim();
				let SNO3				= lines[j].substring(22, 26).trim();

				let obj = {ICBL: ICBL, SH2O: SH2O, SNH4: SNH4, SNO3: SNO3};
				
				initial.push(obj);
				
            }
          }
        }
        return initial;
	
    }
	getIrrigation(globalBasePath, folder, delimiterPath, experiments) {
		let irrigation = [];
		
        for (let i = 0; i < experiments.length; i++) {
          let filePath = globalBasePath + folder + delimiterPath + experiments[i];
          let data = this._fs.readFileSync(filePath);
          let content = data.toString();
          let str = content.substring(content.indexOf(IRRIGATION_DELIMITER), content.indexOf(HARVEST_DELIMITER));
          let lines = str.split(/[\r\n]+/g);
		  
		  let control = "";
		  
          for (let j = 1; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				let C1					= lines[j].substring(0, 2).trim();
				let C2					= lines[j].substring(3, 8).trim();
				
				if(C1 == '@I' && C2 == 'EFIR'){
					control = 'generalData';
				}else if(C1 == '@I' && C2 == 'IDATE'){
					control = 'applicationsData';
				}else{
					
					if(control == 'generalData'){
					
						let I					= lines[j].substring(0, 2).trim();
						let EFIR				= lines[j].substring(3, 8).trim();
						let IDEP				= lines[j].substring(9, 14).trim();
						let ITHR				= lines[j].substring(16, 20).trim();
						let IEPT				= lines[j].substring(22, 26).trim();
						let IOFF				= lines[j].substring(28, 32).trim();
						let IAME				= lines[j].substring(34, 38).trim();
						let IAMT				= lines[j].substring(40, 44).trim();
						let IRNAME				= lines[j].substring(46, 50).trim();
						
						let obj = {I: I, EFIR: EFIR, IDEP: IDEP, ITHR: ITHR, IEPT: IEPT, IOFF: IOFF, IAME: IAME, IAMT : IAMT, IRNAME: IRNAME, APPLICATIONS: [] };
						
						irrigation[I] = obj;
					
					}else if(control == 'applicationsData'){
						
						let I					= lines[j].substring(0, 2).trim();
						let IDATE				= lines[j].substring(3, 8).trim();
						let IROP				= lines[j].substring(9, 14).trim();
						let IRVAL				= lines[j].substring(15, 20).trim();
						
						let obj = { I: I, IDATE: IDATE, IROP: IROP, IRVAL: IRVAL };
						
						irrigation[I].APPLICATIONS.push(obj);
						
					}
				}
					
            }
          }

        }
        return irrigation;
	
    }
	
	getCultivarsCrop(globalBasePath, folder, delimiterPath, crop) {
				
		let cultivars = [];
		
		if(crop != "" && crop != 'FA'){
			
			let cultivarFile = {
							'AL' : 'ALFRM047.CUL',
							'BA' : 'BACER047.CUL',
							'BM' : 'BMGRO047.CUL',
							'BN' : 'BNGRO047.CUL',
							'BR' : 'BRGRO047.CUL',
							'CB' : 'CBGRO047.CUL',
							'CH' : 'CHGRO047.CUL',
							'CN' : 'CNGRO047.CUL',
							'CO' : 'COGRO047.CUL',
							'CP' : 'CPGRO047.CUL',
							'FB' : 'FBGRO047.CUL',
							'GB' : 'GBGRO047.CUL',
							'ML' : 'MLCER047.CUL',
							'MZ' : 'MZCER047.CUL',
							'PI' : 'PIALO047.CUL', 
							'PN' : 'PNGRO047.CUL',
							'PP' : 'PPGRO047.CUL',
							'PR' : 'PRGRO047.CUL',
							'PT' : 'PTSUB047.CUL', 
							'RI' : 'RICER047.CUL',
							'SB' : 'SBGRO047.CUL',
							'SF' : 'SFGRO047.CUL',
							'SG' : 'SGCER047.CUL',
							'SC' : 'SCCSP047.CUL',
							'SU' : 'SUGRO047.CUL',
							'SW' : 'SWCER047.CUL',
							'TM' : 'TMGRO047.CUL',
							'TR' : 'TRARO047.CUL',
							'VB' : 'VBGRO047.CUL'
			}; // C:\DSSAT47\Genotype
			
			
			let filePath = globalBasePath + folder + delimiterPath + cultivarFile[crop];
			let data = this._fs.readFileSync(filePath);
			let content = data.toString();
			let str = content.substring(content.indexOf('@VAR#'));
			let lines = str.split(/[\r\n]+/g);
			
			for (let j = 2; j < lines.length; j++) {
				if(lines[j].trim() != "" && lines[j].substring(0, 1).trim() != '!'){
					let VAR					= lines[j].substring(0, 6).trim();
					let VRNAME				= lines[j].substring(7, 23).trim();
					
					let obj = {ID: VAR, NAME: VRNAME};
					
					cultivars.push(obj);
				}
			}
		}
        return cultivars;
    }
	
	getTillageImplement(globalBasePath, delimiterPath, file) {
				
		let implement = [];
			
		let filePath = globalBasePath + delimiterPath + file; // C:\DSSAT47\DETAIL.CDE
		let data = this._fs.readFileSync(filePath);
		let content = data.toString();
		let str = content.substring(content.indexOf('*Tillage Implements'), content.indexOf('*Field History'));
		let lines = str.split(/[\r\n]+/g);
		
		for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				
				let CDE					= lines[j].substring(0, 8).trim();
				let DESCRIPTION			= lines[j].substring(9, 70).trim();
				
				let obj = {ID: CDE, NAME: DESCRIPTION};
				
				implement.push(obj);
				
			}
		}
		
        return implement;
    }
	
	getFertilizerMaterial(globalBasePath, delimiterPath, file) {
				
		let material = [];
			
		let filePath = globalBasePath + delimiterPath + file; // C:\DSSAT47\DETAIL.CDE
		let data = this._fs.readFileSync(filePath);
		let content = data.toString();
		let str = content.substring(content.indexOf('*Fertilizers, Inoculants and Amendments'), content.indexOf('*Harvest components'));
		let lines = str.split(/[\r\n]+/g);
		
		for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				
				let CDE					= lines[j].substring(0, 8).trim();
				let DESCRIPTION			= lines[j].substring(9, 70).trim();

				let obj = {ID: CDE, NAME: DESCRIPTION};
				
				material.push(obj);
				
			}
		}
		
        return material;
    }
	
	getFertilizerApplications(globalBasePath, delimiterPath, file) {
				
		let applications = [];
			
		let filePath = globalBasePath + delimiterPath + file; // C:\DSSAT47\DETAIL.CDE
		let data = this._fs.readFileSync(filePath);
		let content = data.toString();
		let str = content.substring(content.indexOf('*Methods - Fertilizer and Chemical Applications'), content.indexOf('*Methods - Irrigation and Water Management (Units for associated data)'));
		let lines = str.split(/[\r\n]+/g);
		
		for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				
				let CDE					= lines[j].substring(0, 8).trim();
				let DESCRIPTION			= lines[j].substring(9, 70).trim();
				
				let obj = {ID: CDE, NAME: DESCRIPTION};
				
				applications.push(obj);
				
			}
		}
		
        return applications;
    }
	
	getPlantingMethods(globalBasePath, delimiterPath, file) {
				
		let methods = [];
			
		let filePath = globalBasePath + delimiterPath + file; // C:\DSSAT47\DETAIL.CDE
		let data = this._fs.readFileSync(filePath);
		let content = data.toString();
		let str = content.substring(content.indexOf('*Planting Material/Method'), content.indexOf('*Plant Distribution'));
		let lines = str.split(/[\r\n]+/g);
		
		for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				
				let CDE					= lines[j].substring(0, 8).trim();
				let DESCRIPTION			= lines[j].substring(9, 70).trim();

				let obj = {ID: CDE, NAME: DESCRIPTION};
				
				methods.push(obj);
				
			}
		}
		
        return methods;
    }
	
	getPlantingDistribution(globalBasePath, delimiterPath, file) {
				
		let distribution = [];
			
		let filePath = globalBasePath + delimiterPath + file; // C:\DSSAT47\DETAIL.CDE
		let data = this._fs.readFileSync(filePath);
		let content = data.toString();
		let str = content.substring(content.indexOf('*Plant Distribution'), content.indexOf('*Residues and Organic Fertilizer'));
		let lines = str.split(/[\r\n]+/g);
		
		for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				
				let CDE					= lines[j].substring(0, 8).trim();
				let DESCRIPTION			= lines[j].substring(9, 70).trim();

				let obj = {ID: CDE, NAME: DESCRIPTION};
				
				distribution.push(obj);
				
			}
		}
		
        return distribution;
    }
	
	getHarvestComponents(globalBasePath, delimiterPath, file) {
				
		let components = [];
			
		let filePath = globalBasePath + delimiterPath + file; // C:\DSSAT47\DETAIL.CDE
		let data = this._fs.readFileSync(filePath);
		let content = data.toString();
		let str = content.substring(content.indexOf('*Harvest components'), content.indexOf('*Harvest size categories'));
		let lines = str.split(/[\r\n]+/g);
		
		for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				
				let CDE					= lines[j].substring(0, 8).trim();
				let DESCRIPTION			= lines[j].substring(9, 70).trim();

				let obj = {ID: CDE, NAME: DESCRIPTION};
				
				components.push(obj);
				
			}
		}
		
        return components;
    }
	
	getHarvestSizeCategories(globalBasePath, delimiterPath, file) {
				
		let categories = [];
			
		let filePath = globalBasePath + delimiterPath + file; // C:\DSSAT47\DETAIL.CDE
		let data = this._fs.readFileSync(filePath);
		let content = data.toString();
		let str = content.substring(content.indexOf('*Harvest size categories'), content.indexOf('*Methods - Fertilizer and Chemical Applications'));
		let lines = str.split(/[\r\n]+/g);
		
		for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				
				let CDE					= lines[j].substring(0, 8).trim();
				let DESCRIPTION			= lines[j].substring(9, 70).trim();

				let obj = {ID: CDE, NAME: DESCRIPTION};
				
				categories.push(obj);
				
			}
		}
		
        return categories;
    }
	
	getIrrigationMethods(globalBasePath, delimiterPath, file) {
				
		let components = [];
			
		let filePath = globalBasePath + delimiterPath + file; // C:\DSSAT47\DETAIL.CDE
		let data = this._fs.readFileSync(filePath);
		let content = data.toString();
		let str = content.substring(content.indexOf('*Methods - Irrigation'), content.indexOf('*Methods - Soil Analysis'));
		let lines = str.split(/[\r\n]+/g);
		
		for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				
				let CDE					= lines[j].substring(0, 8).trim();
				let DESCRIPTION			= lines[j].substring(9, 70).trim();

				let obj = {ID: CDE, NAME: DESCRIPTION};
				
				components.push(obj);
				
			}
		}
		
        return components;
    }
	
	getCrops(globalBasePath, delimiterPath, file, returnType = 'obj') {
		
		let cropsObj = [];
		let cropsArray = {};
		
		let filePath = globalBasePath + delimiterPath + file; // C:\DSSAT47\DETAIL.CDE
		let data = this._fs.readFileSync(filePath);
		let content = data.toString();
		let str = content.substring(content.indexOf('*Crop and Weed Species'), content.indexOf('*Disease and Pest Organisms'));
		let lines = str.split(/[\r\n]+/g);
		
		for (let j = 2; j < lines.length; j++) {
			if(lines[j].trim() != ""){
				let CDE					= lines[j].substring(0, 8).trim();
				let DESCRIPTION			= lines[j].substring(9, 70).trim();
				
				if(returnType == 'obj'){
					let obj = {ID: CDE, NAME: DESCRIPTION};
					cropsObj.push(obj);
				}else{
					cropsArray[CDE] = DESCRIPTION;
				}
			}
		}
		
		if(returnType == 'obj')
			return cropsObj
		else
			return cropsArray;
    }
	
	makeCmb(dataArray, val){
		let cmb = '';
		let sel = '';
		if(dataArray.length > 0){
			//alert('ok');
			dataArray.forEach(function(obj) {
				sel = '';
				if(val == obj.ID)
					sel = 'selected';
				cmb += '<option value="'+obj.ID+'" '+sel+'>'+obj.NAME+'</option>';
			});
		}
		return cmb;
	}
	
	valToInput(val){
		
		let newval = "";
		
		if(val === "0")
			newval = "0";
		
		if(val != ""){
			if(!isNaN(val)){
				if(val > 0)
					newval = val;
			}else newval = val;
		}
		
		// numerics
		if(newval != ""){
			let n = newval.indexOf(".", 0);
			if(n >= 0){
				newval = newval.replace(".", ",");
				if(n == 0)
					newval = "0"+newval;
			}
				
		}
		
		return newval;
	}
	
}

module.exports = Xfile;