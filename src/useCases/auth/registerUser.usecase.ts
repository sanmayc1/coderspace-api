import { IUserReopository } from "../../entities/repositoryInterfaces/user/user-repository.interface.js";
import { IUserResgisterUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface.js";
import { UserRegisterRequestDto, UserRegisterResponseDto } from "../../shared/dtos/auth.dto.js";


class RegisterUserUsecase implements IUserResgisterUseCase{

    constructor(private userRepo:IUserReopository){}

   async execute(user: UserRegisterRequestDto): Promise<void> {
         
     const existingUser = await this.userRepo.findByEmail(user.email)
     if(existingUser){
        throw Error("User Aleady Exist")
     }


    }

}