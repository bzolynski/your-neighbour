using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos;
using YourNeighbour.Data.Interfaces.Repositories;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.AdvertisementDefinitions.Commands.CreateAdvertisementDefinition
{
    public sealed class CreateAdvertisementDefinitionHandler : ICommandHandler<CreateAdvertisementDefinitionCommand, AdvertisementDefinitionDto>
    {
        private readonly IAdvertisementDefinitionRepository advertisementDefinitionRepository;
        private readonly IMapper mapper;

        public CreateAdvertisementDefinitionHandler(IAdvertisementDefinitionRepository advertisementDefinitionRepository, IMapper mapper)
        {
            this.advertisementDefinitionRepository = advertisementDefinitionRepository;
            this.mapper = mapper;
        }
        public async Task<AdvertisementDefinitionDto> Handle(CreateAdvertisementDefinitionCommand request, CancellationToken cancellationToken)
        {
            AdvertisementDefinition advertisementDefinition = mapper.Map<AdvertisementDefinition>(request.AdvertisementDefinition);
            AdvertisementDefinition result = await advertisementDefinitionRepository.Create(advertisementDefinition);
            return mapper.Map<AdvertisementDefinitionDto>(result);
        }
    }
}
